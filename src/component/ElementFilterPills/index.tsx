import type {
  FilterType
} from "../../types"


interface ElementFilterPillsProps {
  activeType: FilterType;
  onTypeChange: (type: FilterType) => void;
}

const TYPE_ORDER: FilterType[] = ["all"];

const TYPE_LABELS: Record<FilterType, string> = {
  all: "All Types",
  electric: "Electric (12)",
  grass: "Grass (18)",
  fire: "Fire (14)",
  water: "Water (22)",
  ghost: "Ghost (7)",
};

export default function index({ activeType, onTypeChange }: ElementFilterPillsProps) {
  const styles: Record<FilterType, string> = {
    all: "bg-on-surface text-on-primary",
    electric: "bg-secondary-container/40 text-on-secondary-fixed-variant",
    grass: "bg-surface-container-high text-on-surface",
    fire: "bg-primary-fixed/60 text-on-primary-fixed-variant",
    water: "bg-tertiary-fixed/70 text-on-tertiary-fixed-variant",
    ghost: "bg-surface-container-high text-on-surface",
  };

  return (
    <div className="flex items-center gap-space-xs overflow-x-auto pb-1">
      {TYPE_ORDER.map((type) => (
        <button
          key={type}
          onClick={() => onTypeChange(type)}
          className={`px-space-md py-space-xs rounded-full font-label-sm text-label-sm uppercase tracking-wider shrink-0 transition-transform active:scale-95 ${
            activeType === type
              ? "bg-on-surface text-on-primary"
              : `${styles[type]} hover:brightness-95`
          }`}
        >
          {TYPE_LABELS[type]}
        </button>
      ))}
    </div>
  );
}