export default function index() {
  return (
    <footer className="w-full bg-surface-container-low py-space-xl mt-space-xl shadow-[0_-1px_6px_rgba(0,0,0,0.02)]">
      <div className="max-w-[1280px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop flex flex-col md:flex-row items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-sm">
          <span className="font-label-lg text-label-lg text-on-surface">PokéDex Companion Archive</span>
          <span className="text-on-surface-variant font-body-sm text-body-sm">
            • National &amp; Regional Indexes
          </span>
        </div>
        <div className="font-body-sm text-body-sm text-on-surface-variant text-center md:text-right">
          © 2024 PokéDex Tracker. Creature data sourced for fan collection &amp; tracking.
        </div>
      </div>
    </footer>
  );
}