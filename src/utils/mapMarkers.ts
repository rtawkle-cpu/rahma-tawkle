import L from 'leaflet';
import { SECTORS } from '../data/projects';
import { SectorId } from '../types/project';

function getSectorSvgPath(sector: SectorId): string {
  switch (sector) {
    case 'solar':
      return '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>';
    case 'wind':
      return '<path d="M12.8 19.6A2 2 0 1 0 14 16H2"/><path d="M17.5 8a2.5 2.5 0 1 1 2 4H2"/><path d="M9.8 4.4A2 2 0 1 1 11 8H2"/>';
    case 'hydrogen':
      return '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>';
    case 'transport':
      return '<path d="M8 3.1V7a4 4 0 0 0 8 0V3.1"/><path d="m9 15-1-1"/><path d="m15 15 1-1"/><path d="M9 19c-2.8 0-5-2.2-5-5v-4a8 8 0 0 1 16 0v4c0 2.8-2.2 5-5 5Z"/><path d="m8 19-2 3"/><path d="m16 19 2 3"/>';
  }
}

export function createSectorDivIcon(sector: SectorId, isSelected: boolean): L.DivIcon {
  const meta = SECTORS[sector];
  const size = isSelected ? 46 : 38;
  const ringStyle = isSelected
    ? `box-shadow: 0 0 0 4px rgba(122, 28, 51, 0.28), 0 8px 18px rgba(22, 48, 34, 0.32);`
    : `box-shadow: 0 4px 12px rgba(22, 48, 34, 0.24);`;

  const html = `
    <div
      class="green-marker-pin ${isSelected ? 'is-active' : ''}"
      style="
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background-color: ${meta.color};
        border: 3px solid #FBF8F1;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #FBF8F1;
        ${ringStyle}
      "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="${isSelected ? 22 : 18}"
        height="${isSelected ? 22 : 18}"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        ${getSectorSvgPath(sector)}
      </svg>
    </div>
  `;

  return L.divIcon({
    className: 'green-marker-wrapper',
    html,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    tooltipAnchor: [0, -size / 2],
  });
}
