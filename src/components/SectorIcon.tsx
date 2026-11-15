import { Droplets, Sun, TrainFront, Wind } from 'lucide-react';
import { SectorId } from '../types/project';

interface SectorIconProps {
  sector: SectorId;
  className?: string;
}

export function SectorIcon({ sector, className = 'w-4 h-4' }: SectorIconProps) {
  switch (sector) {
    case 'solar':
      return <Sun className={className} aria-hidden="true" />;
    case 'wind':
      return <Wind className={className} aria-hidden="true" />;
    case 'hydrogen':
      return <Droplets className={className} aria-hidden="true" />;
    case 'transport':
      return <TrainFront className={className} aria-hidden="true" />;
  }
}
