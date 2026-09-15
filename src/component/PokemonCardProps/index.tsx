import type {
  Pokemon,
  TypeStyleMap,
} from "../../types";

interface PokemonCardProps {
  pokemon: Pokemon;
  onSelect: (pokemon: Pokemon) => void;
  toggle: boolean;
  setTabBar: (n: boolean) => void
}
const TYPE_STYLES: TypeStyleMap = {
  Electric: "bg-secondary-fixed text-on-secondary-fixed",
  Grass: "bg-surface-container-high text-on-surface",
  Fire: "bg-primary-fixed text-on-primary-fixed-variant",
  Water: "bg-tertiary-fixed text-on-tertiary-fixed",
  Ghost: "bg-surface-container-high text-on-surface",
  Fighting: "bg-surface-container-high text-on-surface",
  Normal: "bg-surface-container-high text-on-surface",
};

export default function index({ pokemon, onSelect, toggle, setTabBar }: PokemonCardProps) {
  return (
    <button
      type="button"
      onClick={() => {
        onSelect(pokemon);
        setTabBar(true);
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect(pokemon);
          setTabBar(true);
        }
      }}
      className={`${toggle ? 'bg-gray-300' : 'bg-surface-container-lowest'} specimen-card cursor-pointer group relative p-space-md rounded-xl transition-all duration-200 hover:-translate-y-1 text-left border-0 w-full ${
        pokemon.selected
          ? "shadow-md bg-gradient-to-b from-secondary-container/10 to-transparent"
          : "shadow-sm hover:shadow-md"
      }`}
    >
      <div className="flex items-center justify-between mb-space-xs">
        <span className="font-label-md text-label-md text-on-surface-variant">#{pokemon.id}</span>
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center ${
            pokemon.caught
              ? "bg-secondary text-on-secondary shadow-sm"
              : "bg-surface-container-high text-on-surface-variant"
          }`}
        >
          <span
            className="material-symbols-outlined text-[16px]"
            style={pokemon.caught ? { fontVariationSettings: "'FILL' 1" } : {}}
          >
            {pokemon.caught ? "check" : "add"}
          </span>
        </div>
      </div>
      <div className="aspect-square w-full rounded-lg bg-surface-container-low flex items-center justify-center overflow-hidden mb-space-sm p-space-sm">
        <img
          className={`w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 ${
            !pokemon.caught ? "opacity-80 group-hover:opacity-100" : ""
          }`}
          alt={pokemon.name}
          src={pokemon.img}
        />
      </div>
      <div className="flex flex-col">
        <h3 className="font-headline-sm text-headline-sm text-on-surface">{pokemon.name}</h3>
        <div className="flex items-center justify-between mt-space-xs">
          <span
            className={`px-space-sm py-0.5 rounded-full font-label-sm text-label-sm uppercase ${
              TYPE_STYLES[pokemon.typeLabel]
            }`}
          >
            {pokemon.typeLabel}
          </span>
          <span
            className={
              pokemon.caught
                ? "font-body-sm text-body-sm text-secondary font-semibold"
                : "font-label-sm text-label-sm text-on-surface-variant"
            }
          >
            {pokemon.caught ? pokemon.nickname : "Uncaught"}
          </span>
        </div>
      </div>
    </button>
  );
}