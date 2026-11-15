export type SectorId = 'solar' | 'wind' | 'hydrogen' | 'transport';

export type ProjectStatusId = 'operational' | 'partial' | 'in_progress';

export interface SectorMeta {
  id: SectorId;
  label: string;
  shortLabel: string;
  color: string;
  surfaceTint: string;
  description: string;
}

export interface GreenProject {
  id: string;
  name: string;
  englishName: string;
  governorate: string;
  locationDetail: string;
  coordinates: [number, number]; // [lat, lng]
  sector: SectorId;
  capacityLabel: string;
  status: ProjectStatusId;
  statusLabel: string;
  statusDetail: string;
  image: string;
  imageCaption: string;
  summary: string;
  objective: string;
  howItWorks: string;
  environmentalImpact: string;
  economicImpact: string;
  officialSourceName: string;
  officialSourceUrl: string;
  dataCompletenessNote?: string;
}
