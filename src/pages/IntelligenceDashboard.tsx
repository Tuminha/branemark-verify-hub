import { useState, useMemo } from 'react';
import {
  Search,
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
import { Card, CardContent } from '@/components/ui/card';
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
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="min-w-0">
              <h1 className="text-lg sm:text-2xl font-bold text-white flex items-center gap-2 sm:gap-3">
                <Globe2 className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400 flex-shrink-0" />
                <span className="truncate">Brånemark Intelligence Hub</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 truncate">
                Confidential Report for Nobel Biocare | F4R Foundation
              </p>
            </div>

            {/* Credits Section */}
            <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-6">
              <div className="hidden lg:flex items-center gap-4">
                <span className="text-xs text-slate-500">Work done by</span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <img
                      src="/branemark-verify-hub/lovable-uploads/6b459952-000c-4291-b004-b1b9d74cfc7b.png"
                      alt="Francisco Barbosa"
                      className="w-8 h-8 rounded-full border-2 border-blue-500"
                    />
                    <span className="text-sm text-slate-300">Francisco Barbosa</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <img
                      src="/branemark-verify-hub/lovable-uploads/911c3a90-0053-449c-95a9-d38672ab6cdd.png"
                      alt="Pascal Kunz"
                      className="w-8 h-8 rounded-full border-2 border-purple-500"
                    />
                    <span className="text-sm text-slate-300">Pascal Kunz</span>
                  </div>
                </div>
              </div>

              {/* Mobile avatars only */}
              <div className="flex lg:hidden items-center gap-2">
                <span className="text-xs text-slate-500">By</span>
                <img
                  src="/branemark-verify-hub/lovable-uploads/6b459952-000c-4291-b004-b1b9d74cfc7b.png"
                  alt="Francisco Barbosa"
                  className="w-6 h-6 rounded-full border border-blue-500"
                />
                <img
                  src="/branemark-verify-hub/lovable-uploads/911c3a90-0053-449c-95a9-d38672ab6cdd.png"
                  alt="Pascal Kunz"
                  className="w-6 h-6 rounded-full border border-purple-500"
                />
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <Badge variant="outline" className="border-slate-600 text-slate-400 hidden md:flex text-xs">
                  Jan 2025
                </Badge>
                <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-800 text-xs sm:text-sm px-2 sm:px-3">
                  <Download className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Export</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4">
          <Card className="bg-slate-900/80 border-slate-700">
            <CardContent className="p-3 sm:pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] sm:text-xs text-slate-400">Centers</p>
                  <p className="text-lg sm:text-2xl font-bold text-white">{stats.total}</p>
                </div>
                <Building2 className="w-5 h-5 sm:w-8 sm:h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/80 border-slate-700">
            <CardContent className="p-3 sm:pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] sm:text-xs text-slate-400">Countries</p>
                  <p className="text-lg sm:text-2xl font-bold text-white">{stats.countries}</p>
                </div>
                <Globe2 className="w-5 h-5 sm:w-8 sm:h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/80 border-slate-700">
            <CardContent className="p-3 sm:pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] sm:text-xs text-slate-400">Partners</p>
                  <p className="text-lg sm:text-2xl font-bold text-green-400">{stats.nobelPartners}</p>
                </div>
                <TrendingUp className="w-5 h-5 sm:w-8 sm:h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/80 border-slate-700">
            <CardContent className="p-3 sm:pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] sm:text-xs text-slate-400">Competitors</p>
                  <p className="text-lg sm:text-2xl font-bold text-red-400">{stats.competitors}</p>
                </div>
                <AlertTriangle className="w-5 h-5 sm:w-8 sm:h-8 text-red-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/80 border-slate-700">
            <CardContent className="p-3 sm:pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] sm:text-xs text-slate-400">FOR.org</p>
                  <p className="text-lg sm:text-2xl font-bold text-blue-400">{stats.forConnections}</p>
                </div>
                <Users className="w-5 h-5 sm:w-8 sm:h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/80 border-slate-700">
            <CardContent className="p-3 sm:pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] sm:text-xs text-slate-400">Confirmed</p>
                  <p className="text-lg sm:text-2xl font-bold text-emerald-400">{Math.round((stats.confirmed / stats.total) * 100)}%</p>
                </div>
                <CheckCircle2 className="w-5 h-5 sm:w-8 sm:h-8 text-emerald-400" />
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
          <CardContent className="p-3 sm:py-4">
            <div className="flex flex-col gap-3">
              <div className="relative w-full">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Search centers, directors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-800 border-slate-600 text-white placeholder:text-slate-500 text-sm"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <Select value={continentFilter} onValueChange={setContinentFilter}>
                  <SelectTrigger className="w-full sm:w-[140px] bg-slate-800 border-slate-600 text-white text-sm">
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
                  <SelectTrigger className="w-full sm:w-[150px] bg-slate-800 border-slate-600 text-white text-sm">
                    <SelectValue placeholder="Relationship" />
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
                    className="text-slate-400 hover:text-white text-xs"
                  >
                    <X className="w-3 h-3 mr-1" />
                    Clear
                  </Button>
                )}
              </div>
            </div>

            <div className="mt-3 text-xs sm:text-sm text-slate-400">
              Showing {filteredCenters.length} of {centersIntelligence.length} centers
            </div>
          </CardContent>
        </Card>

        {/* Centers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
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
      <footer className="bg-slate-900 border-t border-slate-800 mt-8 sm:mt-12">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
          <div className="flex flex-col items-center gap-2 text-xs sm:text-sm text-slate-400 text-center">
            <div>
              <span className="text-white font-medium">F4R Foundation</span> for Oral Rehabilitation
            </div>
            <div className="hidden sm:block">
              Prepared for Nobel Biocare | Confidential Business Intelligence
            </div>
            <div>
              Research: January 2025
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
