
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
