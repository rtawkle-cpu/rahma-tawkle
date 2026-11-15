import L from 'leaflet';
import { Compass, Layers, Maximize2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import {
  EGYPT_BORDER_GEOJSON,
  EGYPT_GOVERNORATES_AND_CITIES,
} from '../data/egyptGeo';
import { SECTORS } from '../data/projects';
import { GreenProject } from '../types/project';
import { createSectorDivIcon } from '../utils/mapMarkers';

interface EgyptMapProps {
  projects: GreenProject[];
  selectedProject: GreenProject | null;
  onSelectProject: (project: GreenProject) => void;
  resetSignal: number;
}

const EGYPT_CENTER: [number, number] = [26.8206, 30.8025];
const EGYPT_BOUNDS: L.LatLngBoundsExpression = [
  [21.9, 24.7],
  [31.75, 36.95],
];

export function EgyptMap({
  projects,
  selectedProject,
  onSelectProject,
  resetSignal,
}: EgyptMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const geoLayerRef = useRef<L.LayerGroup | null>(null);
  const onSelectRef = useRef(onSelectProject);

  const [showBoundariesAndCities, setShowBoundariesAndCities] = useState(true);
  const [currentZoom, setCurrentZoom] = useState(6);

  useEffect(() => {
    onSelectRef.current = onSelectProject;
  }, [onSelectProject]);

  // Initialize Leaflet map with OpenStreetMap
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: EGYPT_CENTER,
      zoom: 6,
      minZoom: 5,
      maxZoom: 16,
      zoomControl: false,
      scrollWheelZoom: true,
    });

    L.control.zoom({ position: 'topleft' }).addTo(map);
    L.control.scale({ position: 'bottomleft', imperial: false }).addTo(map);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    const geoLayer = L.layerGroup().addTo(map);
    const markersLayer = L.layerGroup().addTo(map);

    mapRef.current = map;
    geoLayerRef.current = geoLayer;
    markersLayerRef.current = markersLayer;

    map.fitBounds(EGYPT_BOUNDS, { padding: [20, 20] });
    setCurrentZoom(map.getZoom());

    const handleZoomEnd = () => {
      setCurrentZoom(map.getZoom());
    };
    map.on('zoomend', handleZoomEnd);

    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
      map.off('zoomend', handleZoomEnd);
      map.remove();
      mapRef.current = null;
      geoLayerRef.current = null;
      markersLayerRef.current = null;
    };
  }, []);

  // Render Egypt boundary & Arabic city/governorate labels
  useEffect(() => {
    const geoLayer = geoLayerRef.current;
    if (!geoLayer) return;

    geoLayer.clearLayers();

    if (!showBoundariesAndCities) return;

    L.geoJSON(EGYPT_BORDER_GEOJSON, {
      style: {
        color: '#163022',
        weight: 2,
        opacity: 0.72,
        dashArray: '6 5',
        fillColor: '#4A5D23',
        fillOpacity: 0.04,
      },
      interactive: false,
    }).addTo(geoLayer);

    EGYPT_GOVERNORATES_AND_CITIES.forEach((city) => {
      if (city.minZoom && currentZoom < city.minZoom) return;

      const dotIcon = L.divIcon({
        className: 'egypt-city-dot',
        html: `<div style="width:${city.isCapital ? 7 : 5}px;height:${city.isCapital ? 7 : 5}px;border-radius:50%;background:${city.isCapital ? '#7A1C33' : '#163022'};border:1.5px solid #FBF8F1;"></div>`,
        iconSize: [8, 8],
        iconAnchor: [4, 4],
      });

      const marker = L.marker(city.coordinates, {
        icon: dotIcon,
        interactive: false,
        keyboard: false,
      });

      marker.bindTooltip(city.isCapital ? `${city.name} (العاصمة)` : city.name, {
        permanent: true,
        direction: 'top',
        offset: [0, -4],
        className: 'egypt-city-label',
      });

      marker.addTo(geoLayer);
    });
  }, [showBoundariesAndCities, currentZoom]);

  // Render filtered project markers
  useEffect(() => {
    const markersLayer = markersLayerRef.current;
    if (!markersLayer) return;

    markersLayer.clearLayers();

    projects.forEach((project) => {
      const isSelected = selectedProject?.id === project.id;
      const sectorMeta = SECTORS[project.sector];

      const marker = L.marker(project.coordinates, {
        icon: createSectorDivIcon(project.sector, isSelected),
        title: `${project.name} — ${project.governorate}`,
        zIndexOffset: isSelected ? 1000 : 100,
      });

      marker.bindTooltip(
        `<div dir="rtl" style="text-align:right;line-height:1.45;">
          <div>${project.name}</div>
          <div style="font-size:11px;font-weight:400;opacity:0.9;">${project.governorate} · ${sectorMeta.label}</div>
        </div>`,
        {
          direction: 'top',
          className: 'egypt-project-tooltip',
          opacity: 1,
        }
      );

      marker.on('click', () => {
        onSelectRef.current(project);
      });

      marker.addTo(markersLayer);
    });
  }, [projects, selectedProject]);

  // Fly to selected project
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectedProject) return;

    const targetZoom = Math.max(map.getZoom(), 8);
    map.flyTo(selectedProject.coordinates, targetZoom, {
      duration: 0.7,
    });
  }, [selectedProject]);

  // Reset map bounds on explicit reset trigger
  useEffect(() => {
    const map = mapRef.current;
    if (!map || resetSignal === 0) return;

    map.fitBounds(EGYPT_BOUNDS, { padding: [24, 24], animate: true });
  }, [resetSignal]);

  const handleFitEgypt = () => {
    mapRef.current?.fitBounds(EGYPT_BOUNDS, { padding: [24, 24], animate: true });
  };

  return (
    <div className="relative w-full h-[460px] sm:h-[540px] lg:h-[620px] rounded-xl overflow-hidden border border-[#DDD5C3] bg-[#EBE5D5] shadow-sm">
      {/* Top-Right Overlay Controls inside Map */}
      <div className="absolute top-3 right-3 z-[400] flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setShowBoundariesAndCities((prev) => !prev)}
          aria-pressed={showBoundariesAndCities}
          className={`inline-flex items-center gap-1.5 px-3 py-2 min-h-[40px] text-xs font-semibold rounded-lg border shadow-sm transition-colors cursor-pointer whitespace-nowrap ${
            showBoundariesAndCities
              ? 'bg-[#163022] text-[#FBF8F1] border-[#163022]'
              : 'bg-[#FBF8F1]/95 text-[#163022] border-[#DDD5C3] hover:bg-[#F3EDE0]'
          }`}
        >
          <Layers className="w-3.5 h-3.5" aria-hidden="true" />
          <span>حدود مصر والمدن</span>
        </button>

        <button
          type="button"
          onClick={handleFitEgypt}
          className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[40px] text-xs font-semibold rounded-lg bg-[#FBF8F1]/95 text-[#163022] border border-[#DDD5C3] shadow-sm hover:bg-[#F3EDE0] transition-colors cursor-pointer whitespace-nowrap"
        >
          <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
          <span>نطاق الجمهورية</span>
        </button>
      </div>

      {/* Subtle Coordinate/Compass Note */}
      <div className="absolute bottom-3 right-3 z-[400] hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FBF8F1]/92 border border-[#DDD5C3] text-[11px] font-medium text-[#52594C] pointer-events-none">
        <Compass className="w-3.5 h-3.5 text-[#4A5D23]" aria-hidden="true" />
        <span>اضغط على أي علامة لاستعراض ملف المشروع الكامل</span>
      </div>

      {/* Leaflet Canvas */}
      <div
        ref={containerRef}
        className="w-full h-full"
        role="region"
        aria-label="خريطة مصر التفاعلية لمشروعات الاقتصاد الأخضر"
      />
    </div>
  );
}
