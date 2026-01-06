
export type ConfidenceLevel = 'confirmed' | 'likely' | 'unconfirmed' | 'unable_to_confirm';

export interface ConfidenceField<T> {
  value: T;
  confidence: ConfidenceLevel;
  source?: string;
  lastUpdated?: string;
}

export interface DirectorInfo {
  name: ConfidenceField<string>;
  title?: string;
  background?: string;
  yearsExperience?: number;
  publications?: number;
  awards?: string[];
  forConnection?: boolean; // Connected to Foundation for Oral Rehabilitation
  nobelBiocareRelation?: 'LEAD' | 'partner' | 'user' | 'former' | 'none' | 'unknown';
}

export interface ImplantBrandInfo {
  brand: string;
  isPrimary: boolean;
  confidence: ConfidenceLevel;
  notes?: string;
}

export interface SocialMedia {
  platform: 'linkedin' | 'instagram' | 'facebook' | 'twitter' | 'youtube' | 'website';
  url: string;
  confidence: ConfidenceLevel;
}

export interface NewsItem {
  title: string;
  date?: string;
  source?: string;
  url?: string;
  summary?: string;
}

export interface CenterIntelligence {
  id: string;
  name: string;
  location: string;
  country: string;
  continent: string;

  // Basic contact info with confidence
  director?: DirectorInfo;
  address?: ConfidenceField<string>;
  phone?: ConfidenceField<string>;
  email?: ConfidenceField<string>;
  website?: ConfidenceField<string>;

  // Geographic
  coordinates: {
    lat: number;
    lng: number;
  };

  // Intelligence fields
  established?: ConfidenceField<number>;
  implantBrands?: ImplantBrandInfo[];
  socialMedia?: SocialMedia[];
  news?: NewsItem[];
  specializations?: string[];
  certifications?: string[];
  facilities?: string[];

  // Key highlights for executives
  keyHighlights?: string[];
  competitiveNotes?: string; // Notes about competitor relationships
  nobelBiocareOpportunity?: string; // Opportunity notes for Nobel Biocare

  // Overall status
  overallConfidence: ConfidenceLevel;
  lastResearched: string;
  researchNotes?: string;
}

// Keep legacy Center type for backward compatibility
export interface Center {
  id: string;
  name: string;
  location: string;
  country: string;
  continent: string;
  director?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Validation {
  centerId: string;
  validationType: 'information' | 'contact';
  validatedBy: 'francisco' | 'pascal';
  timestamp: number;
}

export interface User {
  id: 'francisco' | 'pascal';
  name: string;
  avatar: string;
}

export interface FilterOptions {
  continent: string | null;
  country: string | null;
  validatedBy: 'francisco' | 'pascal' | 'both' | 'none' | null;
  validationType: 'information' | 'contact' | null;
}

// Auth state
export interface AuthState {
  isAuthenticated: boolean;
  authenticatedAt?: number;
}

// Helper function to get confidence badge color
export const getConfidenceColor = (confidence: string): string => {
  switch (confidence) {
    case 'confirmed': return 'bg-green-500';
    case 'likely': return 'bg-blue-500';
    case 'unconfirmed': return 'bg-yellow-500';
    case 'unable_to_confirm': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

// Helper function to get confidence label
export const getConfidenceLabel = (confidence: string): string => {
  switch (confidence) {
    case 'confirmed': return 'Confirmed';
    case 'likely': return 'Likely';
    case 'unconfirmed': return 'Unconfirmed';
    case 'unable_to_confirm': return 'Unable to Confirm';
    default: return 'Unknown';
  }
};

// Get Nobel Biocare relationship badge
export const getNobelRelationBadge = (relation?: string): { label: string; color: string } => {
  switch (relation) {
    case 'LEAD': return { label: 'Nobel LEAD', color: 'bg-purple-600' };
    case 'partner': return { label: 'Partner', color: 'bg-green-600' };
    case 'user': return { label: 'User', color: 'bg-blue-600' };
    case 'former': return { label: 'Former', color: 'bg-orange-600' };
    case 'none': return { label: 'Competitor', color: 'bg-red-600' };
    default: return { label: 'Unknown', color: 'bg-gray-600' };
  }
};
