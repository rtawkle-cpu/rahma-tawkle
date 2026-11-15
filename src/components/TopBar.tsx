interface TopBarProps {
  onResetView: () => void;
}

export function TopBar({ onResetView }: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 bg-[#FBF8F1]/95 backdrop-blur-sm border-b border-[#DDD5C3]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#top"
          className="font-editorial text-xl sm:text-2xl font-bold text-[#163022] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A5D23] rounded-sm"
        >
          بوصلة مصر الخضراء
        </a>

        {/* Zone 2: Concise single-line navigation links */}
        <nav
          aria-label="التنقل الرئيسي"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-[#52594C]"
        >
          <a
            href="#map-workspace"
            className="hover:text-[#163022] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            الخريطة التفاعلية
          </a>
          <a
            href="#projects-sidebar"
            className="hover:text-[#163022] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            المشروعات
          </a>
          <a
            href="#sector-legend"
            className="hover:text-[#163022] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            دليل القطاعات
          </a>
          <a
            href="#about-initiative"
            className="hover:text-[#163022] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            عن المبادرة
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onResetView}
            className="px-4 py-2 min-h-[40px] text-xs sm:text-sm font-semibold text-[#FBF8F1] bg-[#163022] hover:bg-[#4A5D23] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1C33]"
          >
            عرض كامل مصر
          </button>
        </div>
      </div>
    </header>
  );
}
