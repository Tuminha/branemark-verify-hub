import { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  User,
  Award,
  Building2,
  Briefcase,
  BookOpen,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
  Linkedin,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  ExternalLink,
  Star,
  Target
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { CenterIntelligence, ConfidenceLevel, getConfidenceColor, getConfidenceLabel, getNobelRelationBadge } from '../types';

interface CenterIntelligenceCardProps {
  center: CenterIntelligence;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

const ConfidenceBadge = ({ confidence }: { confidence: ConfidenceLevel }) => {
  const icons = {
    confirmed: <CheckCircle2 className="w-3 h-3" />,
    likely: <CheckCircle2 className="w-3 h-3" />,
    unconfirmed: <HelpCircle className="w-3 h-3" />,
    unable_to_confirm: <XCircle className="w-3 h-3" />
  };

  const colors = {
    confirmed: 'bg-green-500/20 text-green-400 border-green-500/30',
    likely: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    unconfirmed: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    unable_to_confirm: 'bg-red-500/20 text-red-400 border-red-500/30'
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs border ${colors[confidence]}`}>
            {icons[confidence]}
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{getConfidenceLabel(confidence)}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const SocialIcon = ({ platform }: { platform: string }) => {
  const icons: Record<string, React.ReactNode> = {
    linkedin: <Linkedin className="w-4 h-4" />,
    instagram: <Instagram className="w-4 h-4" />,
    facebook: <Facebook className="w-4 h-4" />,
    twitter: <Twitter className="w-4 h-4" />,
    youtube: <Youtube className="w-4 h-4" />,
    website: <Globe className="w-4 h-4" />
  };
  return icons[platform] || <Globe className="w-4 h-4" />;
};

export const CenterIntelligenceCard = ({ center, isExpanded = false, onToggleExpand }: CenterIntelligenceCardProps) => {
  const [showAllHighlights, setShowAllHighlights] = useState(false);

  const nobelBadge = getNobelRelationBadge(center.director?.nobelBiocareRelation);

  return (
    <Card className="bg-slate-900/80 border-slate-700 hover:border-slate-600 transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <CardTitle className="text-lg font-semibold text-white truncate">
                {center.name}
              </CardTitle>
              <Badge className={`${nobelBadge.color} text-white text-xs`}>
                {nobelBadge.label}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span>{center.location}</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-500">{center.continent}</span>
            </div>
          </div>

          {/* Overall confidence indicator */}
          <div className="flex flex-col items-end gap-1">
            <Badge variant="outline" className={`
              ${center.overallConfidence === 'confirmed' ? 'border-green-500 text-green-400' : ''}
              ${center.overallConfidence === 'likely' ? 'border-blue-500 text-blue-400' : ''}
              ${center.overallConfidence === 'unconfirmed' ? 'border-yellow-500 text-yellow-400' : ''}
              ${center.overallConfidence === 'unable_to_confirm' ? 'border-red-500 text-red-400' : ''}
            `}>
              {getConfidenceLabel(center.overallConfidence)}
            </Badge>
            <span className="text-xs text-slate-500">Updated: {center.lastResearched}</span>
          </div>
        </div>

        {/* Key Highlights (always visible) */}
        {center.keyHighlights && center.keyHighlights.length > 0 && (
          <div className="mt-3 space-y-1">
            {(showAllHighlights ? center.keyHighlights : center.keyHighlights.slice(0, 2)).map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm">
                <Star className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
                <span className={`${highlight.includes('COMPETITOR') || highlight.includes('Straumann') ? 'text-red-400' : 'text-slate-300'}`}>
                  {highlight}
                </span>
              </div>
            ))}
            {center.keyHighlights.length > 2 && (
              <button
                onClick={() => setShowAllHighlights(!showAllHighlights)}
                className="text-xs text-blue-400 hover:text-blue-300 ml-5"
              >
                {showAllHighlights ? 'Show less' : `+${center.keyHighlights.length - 2} more highlights`}
              </button>
            )}
          </div>
        )}
      </CardHeader>

      <CardContent className="pt-0">
        {/* Director Section */}
        {center.director && (
          <div className="mb-4 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
            <div className="flex items-center gap-2 mb-2">
              <User className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-white">
                {center.director.name.value}
              </span>
              <ConfidenceBadge confidence={center.director.name.confidence} />
              {center.director.forConnection && (
                <Badge className="bg-blue-600/20 text-blue-400 border-blue-500/30 text-xs">
                  FOR.org
                </Badge>
              )}
            </div>

            {center.director.title && (
              <p className="text-xs text-slate-400 mb-1">{center.director.title}</p>
            )}

            {center.director.yearsExperience && (
              <p className="text-xs text-slate-400">
                {center.director.yearsExperience}+ years experience
                {center.director.publications && ` | ${center.director.publications}+ publications`}
              </p>
            )}

            {isExpanded && center.director.background && (
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                {center.director.background}
              </p>
            )}

            {isExpanded && center.director.awards && center.director.awards.length > 0 && (
              <div className="mt-2 space-y-1">
                {center.director.awards.map((award, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs">
                    <Award className="w-3 h-3 text-amber-400 mt-0.5" />
                    <span className="text-slate-300">{award}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Implant Brands (Critical Intelligence) */}
        {center.implantBrands && center.implantBrands.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-white">Implant Brands</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {center.implantBrands.map((brand, idx) => (
                <div key={idx} className="flex items-center gap-1">
                  <Badge
                    variant="outline"
                    className={`
                      ${brand.brand.includes('Straumann') ? 'border-red-500 text-red-400 bg-red-500/10' : ''}
                      ${brand.brand.includes('Nobel') ? 'border-green-500 text-green-400 bg-green-500/10' : ''}
                      ${!brand.brand.includes('Straumann') && !brand.brand.includes('Nobel') ? 'border-slate-500 text-slate-400' : ''}
                    `}
                  >
                    {brand.brand}
                    {brand.isPrimary && ' (Primary)'}
                  </Badge>
                  <ConfidenceBadge confidence={brand.confidence} />
                </div>
              ))}
            </div>
            {center.implantBrands.some(b => b.notes) && isExpanded && (
              <p className="text-xs text-slate-500 mt-1">
                {center.implantBrands.find(b => b.notes)?.notes}
              </p>
            )}
          </div>
        )}

        {/* Nobel Biocare Opportunity */}
        {center.nobelBiocareOpportunity && (
          <div className="mb-4 p-3 bg-purple-900/20 rounded-lg border border-purple-500/30">
            <div className="flex items-center gap-2 mb-1">
              <Target className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-300">Opportunity for Nobel Biocare</span>
            </div>
            <p className="text-xs text-purple-200/80">{center.nobelBiocareOpportunity}</p>
          </div>
        )}

        {/* Competitive Notes */}
        {center.competitiveNotes && (
          <div className="mb-4 p-3 bg-amber-900/20 rounded-lg border border-amber-500/30">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-medium text-amber-300">Competitive Intelligence</span>
            </div>
            <p className="text-xs text-amber-200/80">{center.competitiveNotes}</p>
          </div>
        )}

        {/* Expanded Content */}
        {isExpanded && (
          <>
            {/* Contact Information */}
            <div className="mb-4 space-y-2">
              <div className="text-sm font-medium text-white mb-2">Contact Information</div>

              {center.address && (
                <div className="flex items-start gap-2 text-sm">
                  <Building2 className="w-4 h-4 text-slate-400 mt-0.5" />
                  <span className="text-slate-300">{center.address.value}</span>
                  <ConfidenceBadge confidence={center.address.confidence} />
                </div>
              )}

              {center.phone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-300">{center.phone.value}</span>
                  <ConfidenceBadge confidence={center.phone.confidence} />
                </div>
              )}

              {center.email && (
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <a href={`mailto:${center.email.value}`} className="text-blue-400 hover:underline">
                    {center.email.value}
                  </a>
                  <ConfidenceBadge confidence={center.email.confidence} />
                </div>
              )}

              {center.website && (
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="w-4 h-4 text-slate-400" />
                  <a href={center.website.value} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline flex items-center gap-1">
                    {center.website.value.replace(/^https?:\/\//, '')}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <ConfidenceBadge confidence={center.website.confidence} />
                </div>
              )}
            </div>

            {/* Social Media */}
            {center.socialMedia && center.socialMedia.length > 0 && (
              <div className="mb-4">
                <div className="text-sm font-medium text-white mb-2">Social Media</div>
                <div className="flex flex-wrap gap-2">
                  {center.socialMedia.map((social, idx) => (
                    <a
                      key={idx}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 text-sm transition-colors"
                    >
                      <SocialIcon platform={social.platform} />
                      <span className="capitalize">{social.platform}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Specializations & Certifications */}
            {(center.specializations || center.certifications) && (
              <div className="mb-4">
                {center.specializations && (
                  <div className="mb-2">
                    <div className="text-sm font-medium text-white mb-2">Specializations</div>
                    <div className="flex flex-wrap gap-1.5">
                      {center.specializations.map((spec, idx) => (
                        <Badge key={idx} variant="outline" className="border-slate-600 text-slate-300 text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {center.certifications && (
                  <div>
                    <div className="text-sm font-medium text-white mb-2">Certifications</div>
                    <div className="flex flex-wrap gap-1.5">
                      {center.certifications.map((cert, idx) => (
                        <Badge key={idx} className="bg-green-900/30 text-green-400 border-green-500/30 text-xs">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Facilities */}
            {center.facilities && center.facilities.length > 0 && (
              <div className="mb-4">
                <div className="text-sm font-medium text-white mb-2">Facilities</div>
                <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
                  {center.facilities.map((facility, idx) => (
                    <li key={idx}>{facility}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* News */}
            {center.news && center.news.length > 0 && (
              <div className="mb-4">
                <div className="text-sm font-medium text-white mb-2">Recent News & Updates</div>
                <div className="space-y-2">
                  {center.news.map((item, idx) => (
                    <div key={idx} className="p-2 bg-slate-800/50 rounded-lg">
                      <div className="text-sm font-medium text-slate-200">{item.title}</div>
                      {item.date && <div className="text-xs text-slate-500">{item.date}</div>}
                      {item.summary && <div className="text-xs text-slate-400 mt-1">{item.summary}</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Research Notes */}
            {center.researchNotes && (
              <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                <div className="flex items-center gap-2 mb-1">
                  <BookOpen className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-medium text-slate-300">Research Notes</span>
                </div>
                <p className="text-xs text-slate-400">{center.researchNotes}</p>
              </div>
            )}
          </>
        )}

        {/* Expand/Collapse Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleExpand}
          className="w-full mt-3 text-slate-400 hover:text-white hover:bg-slate-800"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4 mr-2" />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4 mr-2" />
              Show Full Profile
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
