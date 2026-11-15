import { RotateCcw, Search, X } from 'lucide-react';
import { SECTOR_LIST } from '../data/projects';
import { SectorId } from '../types/project';
import { SectorIcon } from './SectorIcon';

interface SearchFilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedSector: SectorId | 'all';
  onSelectSector: (sector: SectorId | 'all') => void;
  visibleCount: number;
  totalCount: number;
  onResetFilters: () => void;
}

export function SearchFilterBar({
  searchQuery,
  onSearchChange,
  selectedSector,
  onSelectSector,
  visibleCount,
  totalCount,
  onResetFilters,
}: SearchFilterBarProps) {
  const hasActiveFilter = searchQuery.trim().length > 0 || selectedSector !== 'all';

  return (
    <section
      aria-label="أدوات البحث والتصفية"
      className="bg-[#F3EDE0] border border-[#DDD5C3] rounded-xl p-4 sm:p-5"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Search Box */}
        <div className="relative flex-1 max-w-md">
          <label htmlFor="project-search" className="sr-only">
            ابحث باسم المشروع أو المحافظة
          </label>
          <Search
            className="w-4 h-4 text-[#52594C] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
          />
          <input
            id="project-search"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="ابحث باسم المشروع أو المحافظة (مثل: أسوان، بنبان، القاهرة)..."
            className="w-full min-h-[44px] pr-10 pl-10 py-2 bg-[#FBF8F1] border border-[#DDD5C3] rounded-lg text-sm text-[#1E241B] placeholder:text-[#52594C]/80 focus:outline-none focus:border-[#4A5D23] focus:ring-2 focus:ring-[#4A5D23]/20"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              aria-label="مسح نص البحث"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-md text-[#52594C] hover:text-[#7A1C33] hover:bg-[#F3EDE0] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Counter & Reset */}
        <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
          <p className="text-sm font-medium text-[#163022] tabular-nums">
            المشروعات المعروضة:{' '}
            <span className="font-bold text-[#7A1C33]">{visibleCount}</span> من أصل{' '}
            <span className="font-semibold">{totalCount}</span>
          </p>

          {hasActiveFilter && (
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[40px] text-xs font-semibold text-[#7A1C33] bg-[#FBF8F1] border border-[#7A1C33]/30 rounded-lg hover:bg-[#7A1C33] hover:text-[#FBF8F1] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>إعادة ضبط</span>
            </button>
          )}
        </div>
      </div>

      {/* Sector Filter Controls */}
      <div
        role="group"
        aria-label="تصفية المشروعات حسب القطاع"
        className="mt-4 pt-4 border-t border-[#DDD5C3] flex flex-wrap items-center gap-2"
      >
        <button
          type="button"
          onClick={() => onSelectSector('all')}
          aria-pressed={selectedSector === 'all'}
          className={`inline-flex items-center gap-2 px-4 py-2 min-h-[42px] text-xs sm:text-sm font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A5D23] ${
            selectedSector === 'all'
              ? 'bg-[#163022] text-[#FBF8F1] border-[#163022]'
              : 'bg-[#FBF8F1] text-[#1E241B] border-[#DDD5C3] hover:border-[#4A5D23] hover:text-[#163022]'
          }`}
        >
          <span>جميع القطاعات</span>
        </button>

        {SECTOR_LIST.map((sector) => {
          const isActive = selectedSector === sector.id;
          return (
            <button
              key={sector.id}
              type="button"
              onClick={() => onSelectSector(sector.id)}
              aria-pressed={isActive}
              className={`inline-flex items-center gap-2 px-4 py-2 min-h-[42px] text-xs sm:text-sm font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A5D23] ${
                isActive
                  ? 'bg-[#4A5D23] text-[#FBF8F1] border-[#4A5D23]'
                  : 'bg-[#FBF8F1] text-[#1E241B] border-[#DDD5C3] hover:border-[#4A5D23] hover:text-[#163022]'
              }`}
            >
              <span
                className="inline-flex items-center justify-center w-5 h-5 rounded-md"
                style={{
                  backgroundColor: isActive ? 'rgba(251, 248, 241, 0.2)' : sector.surfaceTint,
                  color: isActive ? '#FBF8F1' : sector.color,
                }}
              >
                <SectorIcon sector={sector.id} className="w-3.5 h-3.5" />
              </span>
              <span>{sector.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
