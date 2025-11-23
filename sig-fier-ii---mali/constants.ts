import { Village, User } from './types';

// Centre of Mali (approximate for initial view)
export const MAP_CENTER: [number, number] = [12.6392, -8.0029];
export const MAP_ZOOM = 7;

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Amadou Diallo',
  email: 'a.diallo@fier2.ml',
  role: 'Admin',
  avatar: 'https://picsum.photos/200'
};

export const VILLAGES_DATA: Village[] = [
  { id: 'v1', name: 'Sikasso Centre', region: 'Sikasso', cercle: 'Sikasso', commune: 'Sikasso', population: 2500, lat: 11.317, lng: -5.667, beneficiaries: 450, hasWaterPoint: true, hasSchool: true, hasStorage: true, cropType: 'Maïs' },
  { id: 'v2', name: 'Bougouni', region: 'Sikasso', cercle: 'Bougouni', commune: 'Bougouni', population: 1800, lat: 11.417, lng: -7.483, beneficiaries: 320, hasWaterPoint: true, hasSchool: false, hasStorage: true, cropType: 'Karité' },
  { id: 'v3', name: 'Koutiala', region: 'Sikasso', cercle: 'Koutiala', commune: 'Koutiala', population: 3100, lat: 12.392, lng: -5.464, beneficiaries: 600, hasWaterPoint: true, hasSchool: true, hasStorage: false, cropType: 'Coton' as any }, // Simulating generic crop
  { id: 'v4', name: 'Koulikoro', region: 'Koulikoro', cercle: 'Koulikoro', commune: 'Koulikoro', population: 1200, lat: 12.863, lng: -7.560, beneficiaries: 210, hasWaterPoint: false, hasSchool: true, hasStorage: false, cropType: 'Riz' },
  { id: 'v5', name: 'Banamba', region: 'Koulikoro', cercle: 'Banamba', commune: 'Banamba', population: 900, lat: 13.550, lng: -7.450, beneficiaries: 150, hasWaterPoint: true, hasSchool: false, hasStorage: true, cropType: 'Maraîchage' },
  { id: 'v6', name: 'Ségou', region: 'Ségou', cercle: 'Ségou', commune: 'Ségou', population: 2800, lat: 13.440, lng: -6.260, beneficiaries: 500, hasWaterPoint: true, hasSchool: true, hasStorage: true, cropType: 'Riz' },
  { id: 'v7', name: 'Markala', region: 'Ségou', cercle: 'Ségou', commune: 'Markala', population: 1500, lat: 13.680, lng: -6.070, beneficiaries: 280, hasWaterPoint: true, hasSchool: true, hasStorage: false, cropType: 'Riz' },
  { id: 'v8', name: 'San', region: 'Ségou', cercle: 'San', commune: 'San', population: 1600, lat: 13.300, lng: -4.900, beneficiaries: 310, hasWaterPoint: false, hasSchool: true, hasStorage: true, cropType: 'Maïs' },
  { id: 'v9', name: 'Kita', region: 'Kayes', cercle: 'Kita', commune: 'Kita', population: 1400, lat: 13.030, lng: -9.480, beneficiaries: 220, hasWaterPoint: true, hasSchool: false, hasStorage: false, cropType: 'Arachide' as any },
  { id: 'v10', name: 'Bafoulabé', region: 'Kayes', cercle: 'Bafoulabé', commune: 'Bafoulabé', population: 800, lat: 13.810, lng: -10.830, beneficiaries: 120, hasWaterPoint: false, hasSchool: false, hasStorage: true, cropType: 'Maraîchage' },
];

export const REGIONS_GEOJSON_MOCK = {
  // A simplified placeholder for GeoJSON data logic
  type: "FeatureCollection",
  features: [] 
};

export const CHART_DATA_BENEFICIARIES = [
  { name: 'Sikasso', hommes: 4000, femmes: 5200 },
  { name: 'Koulikoro', hommes: 3000, femmes: 3800 },
  { name: 'Ségou', hommes: 2000, femmes: 2800 },
  { name: 'Kayes', hommes: 2780, femmes: 2908 },
  { name: 'Mopti', hommes: 1890, femmes: 1800 },
];

export const CHART_DATA_SECTORS = [
  { name: 'Agriculture', value: 400 },
  { name: 'Élevage', value: 300 },
  { name: 'Pêche', value: 150 },
  { name: 'Transformation', value: 200 },
];

export const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
