import { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Globe2,
  Building2,
  Users,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Download,
  X
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Globe3D } from '@/components/Globe3D';
import { CenterIntelligenceCard } from '@/components/CenterIntelligenceCard';
import { centersIntelligence } from '@/data/centersIntelligence';
import { CenterIntelligence } from '@/types';

export const IntelligenceDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [continentFilter, setContinentFilter] = useState<string>('all');
  const [nobelFilter, setNobelFilter] = useState<string>('all');
  const [selectedCenter, setSelectedCenter] = useState<CenterIntelligence | null>(null);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  // Get unique continents
  const continents = useMemo(() => {
    const unique = [...new Set(centersIntelligence.map(c => c.continent))];
    return unique.sort();
  }, []);

  // Filter centers
  const filteredCenters = useMemo(() => {
    return centersIntelligence.filter(center => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          center.name.toLowerCase().includes(query) ||
          center.location.toLowerCase().includes(query) ||
          center.country.toLowerCase().includes(query) ||
          center.director?.name.value.toLowerCase().includes(query) ||
          center.keyHighlights?.some(h => h.toLowerCase().includes(query));
        if (!matchesSearch) return false;
      }

      // Continent filter
      if (continentFilter !== 'all' && center.continent !== continentFilter) {
        return false;
      }

      // Nobel relationship filter
      if (nobelFilter !== 'all') {
        const relation = center.director?.nobelBiocareRelation || 'unknown';
        if (nobelFilter === 'partner' && !['LEAD', 'partner', 'user'].includes(relation)) return false;
        if (nobelFilter === 'competitor' && relation !== 'none') return false;
        if (nobelFilter === 'unknown' && relation !== 'unknown') return false;
      }

      return true;
    });
  }, [searchQuery, continentFilter, nobelFilter]);

  // Statistics
  const stats = useMemo(() => {
    const total = centersIntelligence.length;
    const confirmed = centersIntelligence.filter(c => c.overallConfidence === 'confirmed').length;
    const nobelPartners = centersIntelligence.filter(c =>
      ['LEAD', 'partner', 'user'].includes(c.director?.nobelBiocareRelation || '')
    ).length;
    const competitors = centersIntelligence.filter(c =>
      c.director?.nobelBiocareRelation === 'none' ||
      c.implantBrands?.some(b => b.brand.includes('Straumann'))
    ).length;
    const forConnections = centersIntelligence.filter(c => c.director?.forConnection).length;
    const countries = [...new Set(centersIntelligence.map(c => c.country))].length;

    return { total, confirmed, nobelPartners, competitors, forConnections, countries };
  }, []);

  const toggleCardExpand = (centerId: string) => {
    setExpandedCards(prev => {
      const next = new Set(prev);
      if (next.has(centerId)) {
        next.delete(centerId);
      } else {
        next.add(centerId);
      }
      return next;
    });
  };

  const handleCenterClick = (center: CenterIntelligence) => {
    setSelectedCenter(center);
    setExpandedCards(prev => new Set(prev).add(center.id));

    // Scroll to center card
    setTimeout(() => {
      const element = document.getElementById(`center-${center.id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setContinentFilter('all');
    setNobelFilter('all');
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-lg border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                <Globe2 className="w-8 h-8 text-blue-400" />
                Brånemark Intelligence Hub
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Confidential Report for Nobel Biocare | Prepared by F4R Foundation
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="border-slate-600 text-slate-400">
                Last Updated: January 2025
              </Badge>
              <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card className="bg-slate-900/80 border-slate-700">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400">Total Centers</p>
                  <p className="text-2xl font-bold text-white">{stats.total}</p>
                </div>
                <Building2 className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/80 border-slate-700">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400">Countries</p>
                  <p className="text-2xl font-bold text-white">{stats.countries}</p>
                </div>
                <Globe2 className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/80 border-slate-700">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400">Nobel Partners</p>
                  <p className="text-2xl font-bold text-green-400">{stats.nobelPartners}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/80 border-slate-700">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400">Competitors</p>
                  <p className="text-2xl font-bold text-red-400">{stats.competitors}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/80 border-slate-700">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400">FOR.org Linked</p>
                  <p className="text-2xl font-bold text-blue-400">{stats.forConnections}</p>
                </div>
                <Users className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/80 border-slate-700">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400">Data Confirmed</p>
                  <p className="text-2xl font-bold text-emerald-400">{Math.round((stats.confirmed / stats.total) * 100)}%</p>
                </div>
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 3D Globe */}
        <Globe3D
          centers={filteredCenters}
          onCenterClick={handleCenterClick}
          selectedCenter={selectedCenter}
        />

        {/* Filters */}
        <Card className="bg-slate-900/80 border-slate-700">
          <CardContent className="py-4">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Search centers, directors, locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-800 border-slate-600 text-white placeholder:text-slate-500"
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <Select value={continentFilter} onValueChange={setContinentFilter}>
                  <SelectTrigger className="w-[160px] bg-slate-800 border-slate-600 text-white">
                    <SelectValue placeholder="Continent" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="all">All Continents</SelectItem>
                    {continents.map(continent => (
                      <SelectItem key={continent} value={continent}>{continent}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={nobelFilter} onValueChange={setNobelFilter}>
                  <SelectTrigger className="w-[180px] bg-slate-800 border-slate-600 text-white">
                    <SelectValue placeholder="Nobel Relationship" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="all">All Relationships</SelectItem>
                    <SelectItem value="partner">Nobel Partners</SelectItem>
                    <SelectItem value="competitor">Competitors</SelectItem>
                    <SelectItem value="unknown">Unknown</SelectItem>
                  </SelectContent>
                </Select>

                {(searchQuery || continentFilter !== 'all' || nobelFilter !== 'all') && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Clear
                  </Button>
                )}
              </div>
            </div>

            <div className="mt-3 text-sm text-slate-400">
              Showing {filteredCenters.length} of {centersIntelligence.length} centers
            </div>
          </CardContent>
        </Card>

        {/* Centers Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {filteredCenters.map(center => (
            <div key={center.id} id={`center-${center.id}`}>
              <CenterIntelligenceCard
                center={center}
                isExpanded={expandedCards.has(center.id)}
                onToggleExpand={() => toggleCardExpand(center.id)}
              />
            </div>
          ))}
        </div>

        {filteredCenters.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400">No centers match your search criteria.</p>
            <Button variant="link" onClick={clearFilters} className="text-blue-400 mt-2">
              Clear filters
            </Button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
            <div>
              <span className="text-white font-medium">F4R Foundation</span> for Oral Rehabilitation
            </div>
            <div>
              Prepared for Nobel Biocare | Confidential Business Intelligence
            </div>
            <div className="flex items-center gap-2">
              <span>Research conducted: January 2025</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
