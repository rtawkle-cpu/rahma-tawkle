import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  ExternalLink,
  Leaf,
  MapPin,
  TrendingUp,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { SECTORS } from '../data/projects';
import { GreenProject } from '../types/project';
import { SectorIcon } from './SectorIcon';

interface ProjectDetailCardProps {
  project: GreenProject;
  onClose: () => void;
}

export function ProjectDetailCard({ project, onClose }: ProjectDetailCardProps) {
  const [imageError, setImageError] = useState(false);
  const sector = SECTORS[project.sector];

  useEffect(() => {
    setImageError(false);
  }, [project.id]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const renderStatusIcon = () => {
    if (project.status === 'operational') {
      return <CheckCircle2 className="w-4 h-4 text-[#163022] shrink-0" aria-hidden="true" />;
    }
    return <Clock className="w-4 h-4 text-[#7A1C33] shrink-0" aria-hidden="true" />;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-detail-title"
      className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-6 bg-[#163022]/55 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <article
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#FBF8F1] border border-[#DDD5C3] rounded-2xl shadow-2xl text-[#1E241B]"
      >
        {/* Top Header */}
        <header className="sticky top-0 z-10 bg-[#FBF8F1]/95 backdrop-blur-sm border-b border-[#DDD5C3] px-5 sm:px-7 py-4 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#52594C]">
              <span
                className="inline-flex items-center gap-1.5 font-semibold"
                style={{ color: sector.color }}
              >
                <SectorIcon sector={project.sector} className="w-3.5 h-3.5" />
                {sector.label}
              </span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1 font-medium text-[#163022]">
                <MapPin className="w-3.5 h-3.5 text-[#4A5D23]" aria-hidden="true" />
                محافظة {project.governorate}
              </span>
            </div>
            <h2
              id="project-detail-title"
              className="font-editorial text-xl sm:text-2xl font-bold text-[#163022] mt-1 leading-snug"
            >
              {project.name}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[42px] text-xs sm:text-sm font-semibold text-[#FBF8F1] bg-[#7A1C33] hover:bg-[#5E1426] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#163022]"
          >
            <X className="w-4 h-4" aria-hidden="true" />
            <span>إغلاق والعودة للخريطة</span>
          </button>
        </header>

        <div className="p-5 sm:p-7 space-y-6">
          {/* Image + Key Location & Status Summary */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            <figure className="md:col-span-6 flex flex-col">
              <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden border border-[#DDD5C3] bg-[#F3EDE0]">
                {!imageError ? (
                  <img
                    src={project.image}
                    alt={`${project.name} — ${project.governorate}`}
                    referrerPolicy="no-referrer"
                    onError={() => setImageError(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full flex flex-col items-center justify-center p-6 text-center gap-3"
                    style={{ backgroundColor: sector.surfaceTint }}
                  >
                    <SectorIcon sector={project.sector} className="w-10 h-10 text-[#163022]" />
                    <p className="text-sm font-bold text-[#163022]">{project.name}</p>
                    <p className="text-xs text-[#52594C]">{project.locationDetail}</p>
                  </div>
                )}
              </div>
              <figcaption className="mt-2 text-xs text-[#52594C] leading-relaxed">
                {project.imageCaption}
              </figcaption>
            </figure>

            {/* Structured Accession / Fact Grid */}
            <div className="md:col-span-6 bg-[#F3EDE0]/70 border border-[#DDD5C3] rounded-xl p-5 flex flex-col justify-between">
              <dl className="divide-y divide-[#DDD5C3] text-sm">
                <div className="pb-3">
                  <dt className="text-xs font-semibold text-[#52594C]">المحافظة والموقع الجغرافي</dt>
                  <dd className="mt-1 font-medium text-[#163022] leading-relaxed">
                    محافظة {project.governorate} — {project.locationDetail}
                  </dd>
                  <dd className="mt-1 text-xs text-[#52594C] tabular-nums" dir="ltr">
                    {project.coordinates[0].toFixed(4)}° N, {project.coordinates[1].toFixed(4)}° E
                  </dd>
                </div>

                <div className="py-3">
                  <dt className="text-xs font-semibold text-[#52594C]">القطاع والقدرة</dt>
                  <dd className="mt-1 font-semibold text-[#163022] tabular-nums">
                    {sector.label} · {project.capacityLabel}
                  </dd>
                </div>

                <div className="pt-3">
                  <dt className="text-xs font-semibold text-[#52594C]">الحالة الحالية للمشروع</dt>
                  <dd className="mt-1.5 flex items-start gap-2">
                    {renderStatusIcon()}
                    <div>
                      <span
                        className={`font-bold ${
                          project.status === 'operational'
                            ? 'text-[#163022]'
                            : 'text-[#7A1C33]'
                        }`}
                      >
                        {project.statusLabel}
                      </span>
                      <p className="mt-0.5 text-xs text-[#52594C] leading-relaxed">
                        {project.statusDetail}
                      </p>
                    </div>
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Data Completeness Alert when applicable */}
          {project.dataCompletenessNote && (
            <div
              role="note"
              className="flex items-start gap-3 p-4 rounded-xl bg-[#F9E8EC]/70 border border-[#7A1C33]/30 text-[#5E1426]"
            >
              <AlertTriangle className="w-5 h-5 text-[#7A1C33] shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-xs sm:text-sm leading-relaxed font-medium">
                {project.dataCompletenessNote}
              </p>
            </div>
          )}

          {/* Narrative Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <section className="p-5 rounded-xl border border-[#DDD5C3] bg-[#FBF8F1]">
              <h3 className="text-base font-bold text-[#163022]">نبذة مبسطة عن المشروع</h3>
              <p className="mt-2 text-sm text-[#1E241B] leading-relaxed">{project.summary}</p>
            </section>

            <section className="p-5 rounded-xl border border-[#DDD5C3] bg-[#FBF8F1]">
              <h3 className="text-base font-bold text-[#163022]">الهدف من إنشائه</h3>
              <p className="mt-2 text-sm text-[#1E241B] leading-relaxed">{project.objective}</p>
            </section>
          </div>

          <section className="p-5 rounded-xl border border-[#DDD5C3] bg-[#F3EDE0]/45">
            <h3 className="text-base font-bold text-[#163022]">طريقة عمله</h3>
            <p className="mt-2 text-sm text-[#1E241B] leading-relaxed">{project.howItWorks}</p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <section className="p-5 rounded-xl border border-[#DDD5C3] bg-[#E2ECE6]/45">
              <div className="flex items-center gap-2 text-[#163022]">
                <Leaf className="w-4 h-4 text-[#4A5D23]" aria-hidden="true" />
                <h3 className="text-base font-bold">التأثير البيئي</h3>
              </div>
              <p className="mt-2 text-sm text-[#1E241B] leading-relaxed">
                {project.environmentalImpact}
              </p>
            </section>

            <section className="p-5 rounded-xl border border-[#DDD5C3] bg-[#F3EDE0]/65">
              <div className="flex items-center gap-2 text-[#163022]">
                <TrendingUp className="w-4 h-4 text-[#7A1C33]" aria-hidden="true" />
                <h3 className="text-base font-bold">التأثير الاقتصادي</h3>
              </div>
              <p className="mt-2 text-sm text-[#1E241B] leading-relaxed">
                {project.economicImpact}
              </p>
            </section>
          </div>

          {/* Footer with Official Source & Close Button */}
          <footer className="pt-4 border-t border-[#DDD5C3] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
              <span className="font-semibold text-[#52594C]">المصدر الرسمي للمعلومات:</span>
              <a
                href={project.officialSourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-bold text-[#4A5D23] hover:text-[#163022] underline underline-offset-4"
              >
                <span>{project.officialSourceName}</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 min-h-[44px] text-sm font-semibold text-[#FBF8F1] bg-[#163022] hover:bg-[#4A5D23] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>إغلاق البطاقة والعودة للخريطة</span>
            </button>
          </footer>
        </div>
      </article>
    </div>
  );
}
