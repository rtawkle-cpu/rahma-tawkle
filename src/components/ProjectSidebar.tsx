import { ChevronLeft, MapPin, RotateCcw } from 'lucide-react';
import { SECTORS } from '../data/projects';
import { GreenProject } from '../types/project';
import { SectorIcon } from './SectorIcon';

interface ProjectSidebarProps {
  projects: GreenProject[];
  selectedProjectId: string | null;
  onSelectProject: (project: GreenProject) => void;
  onResetFilters: () => void;
}

export function ProjectSidebar({
  projects,
  selectedProjectId,
  onSelectProject,
  onResetFilters,
}: ProjectSidebarProps) {
  return (
    <aside
      id="projects-sidebar"
      aria-label="قائمة مشروعات الاقتصاد الأخضر"
      className="bg-[#FBF8F1] border border-[#DDD5C3] rounded-xl flex flex-col h-full lg:max-h-[620px]"
    >
      <div className="px-4 py-3.5 border-b border-[#DDD5C3] bg-[#F3EDE0]/60 rounded-t-xl flex items-center justify-between gap-3">
        <h2 className="font-editorial text-lg font-bold text-[#163022]">
          قائمة المشروعات
        </h2>
        <span className="text-xs font-semibold text-[#52594C] tabular-nums">
          {projects.length} {projects.length === 1 ? 'مشروع' : 'مشروعات'}
        </span>
      </div>

      {projects.length === 0 ? (
        <div className="p-6 text-center flex-1 flex flex-col items-center justify-center gap-3">
          <p className="text-sm font-semibold text-[#163022]">
            لا توجد مشروعات مطابقة لبحثك
          </p>
          <p className="text-xs text-[#52594C] leading-relaxed">
            جرّب البحث باسم محافظة أخرى أو إعادة ضبط تصفية القطاعات لعرض جميع المواقع.
          </p>
          <button
            type="button"
            onClick={onResetFilters}
            className="mt-1 inline-flex items-center gap-1.5 px-4 py-2 min-h-[40px] text-xs font-semibold bg-[#163022] text-[#FBF8F1] rounded-lg hover:bg-[#4A5D23] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>عرض جميع المشروعات</span>
          </button>
        </div>
      ) : (
        <ul className="divide-y divide-[#DDD5C3] overflow-y-auto flex-1">
          {projects.map((project) => {
            const sector = SECTORS[project.sector];
            const isSelected = selectedProjectId === project.id;

            return (
              <li key={project.id}>
                <button
                  type="button"
                  onClick={() => onSelectProject(project)}
                  aria-current={isSelected ? 'true' : undefined}
                  className={`w-full text-right p-4 transition-colors flex items-start gap-3 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#4A5D23] ${
                    isSelected
                      ? 'bg-[#F3EDE0]'
                      : 'hover:bg-[#F3EDE0]/50'
                  }`}
                >
                  <span
                    className="mt-0.5 w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border"
                    style={{
                      backgroundColor: sector.surfaceTint,
                      color: sector.color,
                      borderColor: `${sector.color}33`,
                    }}
                  >
                    <SectorIcon sector={project.sector} className="w-4 h-4" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-bold text-[#163022] leading-snug">
                        {project.name}
                      </h3>
                      <ChevronLeft
                        className={`w-4 h-4 shrink-0 mt-0.5 transition-transform ${
                          isSelected ? 'text-[#7A1C33] -translate-x-0.5' : 'text-[#52594C]'
                        }`}
                        aria-hidden="true"
                      />
                    </div>

                    {/* Clean unboxed metadata per Zero-Pill rule */}
                    <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-[#52594C]">
                      <span className="inline-flex items-center gap-1 font-medium text-[#1E241B]">
                        <MapPin className="w-3 h-3 text-[#4A5D23]" aria-hidden="true" />
                        {project.governorate}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{sector.label}</span>
                    </div>

                    <p className="mt-1.5 text-xs text-[#52594C] leading-relaxed">
                      <span
                        className={`font-semibold ${
                          project.status === 'operational'
                            ? 'text-[#163022]'
                            : 'text-[#7A1C33]'
                        }`}
                      >
                        {project.statusLabel}
                      </span>
                      <span aria-hidden="true"> · </span>
                      <span className="tabular-nums">{project.capacityLabel}</span>
                    </p>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </aside>
  );
}
