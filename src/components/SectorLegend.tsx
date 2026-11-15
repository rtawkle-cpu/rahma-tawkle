import { SECTOR_LIST } from '../data/projects';
import { SectorId } from '../types/project';
import { SectorIcon } from './SectorIcon';

interface SectorLegendProps {
  activeSector: SectorId | 'all';
  onSelectSector: (sector: SectorId | 'all') => void;
}

export function SectorLegend({ activeSector, onSelectSector }: SectorLegendProps) {
  return (
    <section
      id="sector-legend"
      aria-label="مفتاح ألوان وأيقونات القطاعات"
      className="bg-[#FBF8F1] border border-[#DDD5C3] rounded-xl p-5"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#DDD5C3]">
        <div>
          <h2 className="font-editorial text-xl font-bold text-[#163022]">
            مفتاح القطاعات ودليل الأيقونات
          </h2>
          <p className="text-xs text-[#52594C] mt-0.5">
            يمثل كل لون وأيقونة على الخريطة قطاعًا محددًا من قطاعات الاقتصاد الأخضر في مصر.
          </p>
        </div>
        <span className="text-xs font-medium text-[#52594C]">
          اضغط على أي قطاع للتصفية السريعة
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {SECTOR_LIST.map((sector) => {
          const isActive = activeSector === sector.id;
          return (
            <button
              key={sector.id}
              type="button"
              onClick={() => onSelectSector(isActive ? 'all' : sector.id)}
              aria-pressed={isActive}
              className={`text-right p-3.5 rounded-lg border transition-colors flex items-start gap-3 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A5D23] ${
                isActive
                  ? 'bg-[#F3EDE0] border-[#4A5D23]'
                  : 'bg-[#FBF8F1] border-[#DDD5C3] hover:bg-[#F3EDE0]/60'
              }`}
            >
              <span
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 border-[#FBF8F1] shadow-sm"
                style={{
                  backgroundColor: sector.color,
                  color: '#FBF8F1',
                }}
              >
                <SectorIcon sector={sector.id} className="w-4 h-4" />
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-bold text-[#163022]">
                    {sector.label}
                  </span>
                </div>
                <p className="mt-1 text-xs text-[#52594C] leading-relaxed">
                  {sector.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
