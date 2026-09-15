import type {
  Layout,
  ActiveTab
} from "../../types";


interface FilterToolbarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  layout: Layout;
  onLayoutChange: (layout: Layout) => void;
  onSearch: (query: string) => void;
  caughtCount: number;
  DarkMode: (t: boolean) => void
  toggle: boolean
}

export default function index({
  activeTab,
  onTabChange,
  layout,
  onLayoutChange,
  onSearch,
  caughtCount,
  DarkMode,
  toggle
}: FilterToolbarProps) {
  return (
    <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
      <div className="inline-flex p-1 bg-surface-container-high rounded-xl self-start sm:self-auto">
        <button
          onClick={() => onTabChange("all")}
          className={`flex items-center gap-space-xs px-space-md py-space-xs rounded-lg font-label-md text-label-md transition-all duration-200 ${
            activeTab === "all"
              ? "bg-surface-container-lowest text-on-surface shadow-sm"
              : "text-on-surface-variant hover:text-on-surface"
          }`}
        >
          <span>All Pokédex</span>
          <span className="px-1.5 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant text-[10px]">
            1,025
          </span>
        </button>
        <button
          onClick={() => onTabChange("captured")}
          className={`flex items-center gap-space-xs px-space-md py-space-xs rounded-lg font-label-md text-label-md transition-all duration-200 ${
            activeTab === "captured"
              ? "bg-surface-container-lowest text-on-surface shadow-sm"
              : "text-on-surface-variant hover:text-on-surface"
          }`}
        >
          {/* <span className="material-symbols-outlined text-[18px]">check_circle</span> */}
          <span>Captured</span>
          <span className="px-1.5 py-0.5 rounded-full bg-secondary-container/40 text-on-secondary-fixed-variant font-bold text-[10px]">
            {caughtCount}
          </span>
        </button>
      </div>
        <span>{ !toggle ? 'Dark Mode:' : 'Light Mode:'}</span>
        <button
        type="button"
        role="switch"
        aria-checked={toggle}
        onClick={() => DarkMode(!toggle)}
        className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
            toggle ? "bg-secondary" : "bg-surface-container-highest"
            
        }`}
        >
        <span
            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out ${
            toggle ? "translate-x-6" : "translate-x-1"
            }`}
        />
        </button>

      <div className="flex items-center gap-space-sm w-full sm:w-auto justify-between sm:justify-end">
        <div className="relative flex-1 sm:w-64">
          
          <input
            onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-8 pr-space-md py-space-xs rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm placeholder:text-on-surface-variant focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary transition-all"
            placeholder="Quick find specimen..."
            type="text"
          />
        </div>
        <div className="flex items-center bg-surface-container-low p-0.5 rounded-lg shrink-0">
          <button
            onClick={() => onLayoutChange("grid")}
            title="Grid Layout"
            className={`p-1.5 rounded ${
              layout === "grid"
                ? "bg-surface-container-lowest text-on-surface shadow-sm"
                : "text-on-surface-variant hover:text-on-surface transition-colors"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">grid_view</span>
          </button>
          <button
            onClick={() => onLayoutChange("list")}
            title="List Layout"
            className={`p-1.5 rounded ${
              layout === "list"
                ? "bg-surface-container-lowest text-on-surface shadow-sm"
                : "text-on-surface-variant hover:text-on-surface transition-colors"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">view_list</span>
          </button>
        </div>
      </div>
    </div>
  );
}