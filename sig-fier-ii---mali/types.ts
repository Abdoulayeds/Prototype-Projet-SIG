export type UserRole = 'Admin' | 'Consultant S&E' | 'Visiteur';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Village {
  id: string;
  name: string;
  region: string;
  cercle: string;
  commune: string;
  population: number;
  lat: number;
  lng: number;
  beneficiaries: number;
  hasWaterPoint: boolean;
  hasSchool: boolean;
  hasStorage: boolean; // Magasin de stockage
  cropType: 'Riz' | 'Maïs' | 'Maraîchage' | 'Karité';
}

export interface Indicator {
  label: string;
  value: number | string;
  change?: number; // percentage
  trend?: 'up' | 'down' | 'neutral';
}

export type ViewState = 'login' | 'dashboard' | 'map' | 'data' | 'admin';
