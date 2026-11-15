import { useCallback, useMemo, useState } from 'react';
import { EgyptMap } from './components/EgyptMap';
import { ProjectDetailCard } from './components/ProjectDetailCard';
import { ProjectSidebar } from './components/ProjectSidebar';
import { SearchFilterBar } from './components/SearchFilterBar';
import { SectorLegend } from './components/SectorLegend';
import { TopBar } from './components/TopBar';
import { GREEN_PROJECTS } from './data/projects';
import { GreenProject, SectorId } from './types/project';

function normalizeArabic(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/[\u064B-\u065F]/g, '');
}

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState<SectorId | 'all'>('all');
  const [selectedProject, setSelectedProject] = useState<GreenProject | null>(null);
  const [resetSignal, setResetSignal] = useState(0);

  const filteredProjects = useMemo(() => {
    const normalizedQuery = normalizeArabic(searchQuery);

    return GREEN_PROJECTS.filter((project) => {
      const matchesSector =
        selectedSector === 'all' || project.sector === selectedSector;

      if (!matchesSector) return false;
      if (!normalizedQuery) return true;

      const searchableText = normalizeArabic(
        `${project.name} ${project.englishName} ${project.governorate} ${project.locationDetail}`
      );
      return searchableText.includes(normalizedQuery);
    });
  }, [searchQuery, selectedSector]);

  const handleSelectSector = useCallback((sector: SectorId | 'all') => {
    setSelectedSector(sector);
    setSelectedProject((current) => {
      if (!current) return null;
      if (sector !== 'all' && current.sector !== sector) return null;
      return current;
    });
  }, []);

  const handleResetFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedSector('all');
    setSelectedProject(null);
    setResetSignal((prev) => prev + 1);
  }, []);

  return (
    <div id="top" className="min-h-screen flex flex-col bg-[#FBF8F1] text-[#1E241B]">
      <TopBar onResetView={handleResetFilters} />

      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-9 space-y-6">
        {/* Editorial Introduction Header */}
        <section className="max-w-3xl space-y-3">
          <p className="text-xs sm:text-sm font-semibold text-[#7A1C33]">
            بوصلة مصر الخضراء – Green Egypt
          </p>
          <h1
            className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#163022] leading-tight"
            style={{ textWrap: 'balance' }}
          >
            اكتشف مصر الخضراء
          </h1>
          <p className="text-sm sm:text-base text-[#52594C] leading-relaxed max-w-2xl">
            خريطة جغرافية تفاعلية لجمهورية مصر العربية ترصد أبرز مشروعات الاقتصاد الأخضر
            والاستدامة في المحافظات المصرية، وتوضح مواقعها الفعلية وأثرها البيئي والاقتصادي
            استنادًا إلى البيانات الرسمية الموثقة.
          </p>
        </section>

        {/* Search, Sector Filter & Counter */}
        <SearchFilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedSector={selectedSector}
          onSelectSector={handleSelectSector}
          visibleCount={filteredProjects.length}
          totalCount={GREEN_PROJECTS.length}
          onResetFilters={handleResetFilters}
        />

        {/* Core Stage: Sidebar + Centered Interactive Map */}
        <section
          id="map-workspace"
          aria-label="مساحة الخريطة التفاعلية وقائمة المشروعات"
          className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch"
        >
          {/* Sidebar Project Index */}
          <div className="lg:col-span-4 xl:col-span-3 order-2 lg:order-1">
            <ProjectSidebar
              projects={filteredProjects}
              selectedProjectId={selectedProject?.id ?? null}
              onSelectProject={setSelectedProject}
              onResetFilters={handleResetFilters}
            />
          </div>

          {/* Interactive Leaflet Map in Main Center */}
          <div className="lg:col-span-8 xl:col-span-9 order-1 lg:order-2">
            <EgyptMap
              projects={filteredProjects}
              selectedProject={selectedProject}
              onSelectProject={setSelectedProject}
              resetSignal={resetSignal}
            />
          </div>
        </section>

        {/* Sector Color & Icon Key */}
        <SectorLegend
          activeSector={selectedSector}
          onSelectSector={handleSelectSector}
        />

        {/* Editorial Verification & Methodology Note */}
        <section
          id="about-initiative"
          className="bg-[#F3EDE0]/65 border border-[#DDD5C3] rounded-xl p-5 sm:p-6"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-3xl">
              <h2 className="font-editorial text-xl font-bold text-[#163022]">
                منهجية التوثيق والشفافية
              </h2>
              <p className="text-xs sm:text-sm text-[#52594C] leading-relaxed">
                تلتزم الخريطة بعرض الإحداثيات الجغرافية الدقيقة للمواقع الميدانية والتمييز
                الصريح بين المشروعات القائمة والعاملة بالفعل والمشروعات التي لا تزال في مراحل
                التشغيل الجزئي أو التنفيذ التجاري، مع الإحالة المباشرة إلى الجهات الرسمية مثل
                هيئة الطاقة الجديدة والمتجددة والمنطقة الاقتصادية لقناة السويس والهيئة القومية
                للأنفاق.
              </p>
            </div>
            <div className="text-xs text-[#52594C] shrink-0 md:text-left">
              <p className="font-semibold text-[#163022]">مناطق التغطية الحالية</p>
              <p className="mt-0.5">أسوان · البحر الأحمر · السويس · القاهرة</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#DDD5C3] bg-[#F3EDE0]/50 py-5 mt-6">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#52594C]">
          <p className="font-medium text-[#163022]">
            بوصلة مصر الخضراء – Green Egypt · خريطة تفاعلية للاقتصاد الأخضر والاستدامة
          </p>
          <p>البيانات الخرائطية عبر OpenStreetMap و Leaflet</p>
        </div>
      </footer>

      {/* Project Detail Dossier Modal */}
      {selectedProject && (
        <ProjectDetailCard
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
