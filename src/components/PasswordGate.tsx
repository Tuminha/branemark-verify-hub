import { useState, useEffect } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// The password - in production, this would be environment variable
const ACCESS_PASSWORD = 'nobel2025';

interface PasswordGateProps {
  children: React.ReactNode;
}

export const PasswordGate = ({ children }: PasswordGateProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if already authenticated
    const authData = localStorage.getItem('branemark-intel-auth');
    if (authData) {
      try {
        const parsed = JSON.parse(authData);
        // Check if auth is less than 7 days old
        const sevenDays = 7 * 24 * 60 * 60 * 1000;
        if (parsed.authenticatedAt && Date.now() - parsed.authenticatedAt < sevenDays) {
          setIsAuthenticated(true);
        }
      } catch {
        localStorage.removeItem('branemark-intel-auth');
      }
    }
    setIsLoading(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password === ACCESS_PASSWORD) {
      const authData = {
        isAuthenticated: true,
        authenticatedAt: Date.now()
      };
      localStorage.setItem('branemark-intel-auth', JSON.stringify(authData));
      setIsAuthenticated(true);
    } else {
      setError('Invalid password. Please try again.');
      setPassword('');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-pulse text-slate-400">Loading...</div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <Card className="w-full max-w-md bg-slate-900/90 border-slate-700 backdrop-blur-xl relative z-10">
        <CardHeader className="text-center space-y-4">
          {/* Logo/Icon */}
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
            <Lock className="w-8 h-8 text-white" />
          </div>

          <div>
            <CardTitle className="text-2xl font-bold text-white">
              Brånemark Intelligence Hub
            </CardTitle>
            <CardDescription className="text-slate-400 mt-2">
              Confidential report for Nobel Biocare
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm text-slate-300">
                Enter access password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500 pr-10"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white"
            >
              Access Report
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-700">
            <p className="text-xs text-slate-500 text-center">
              This report contains confidential business intelligence prepared by F4R Foundation for Nobel Biocare.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
