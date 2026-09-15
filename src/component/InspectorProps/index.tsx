import type {
  Pokemon,
  TypeStyleMap
} from "../../types";
import {usePokemonAPi} from '../../api/api'
import { useEffect } from "react";

const TYPE_STYLES: TypeStyleMap = {
  Electric: "bg-secondary-fixed text-on-secondary-fixed",
  Grass: "bg-surface-container-high text-on-surface",
  Fire: "bg-primary-fixed text-on-primary-fixed-variant",
  Water: "bg-tertiary-fixed text-on-tertiary-fixed",
  Ghost: "bg-surface-container-high text-on-surface",
  Fighting: "bg-surface-container-high text-on-surface",
  Normal: "bg-surface-container-high text-on-surface",
};

interface InspectorProps {
  pokemon: Pokemon | null;
  caughtStatus: boolean;
  nickname: string;
  date: string;
  onToggleCapture: () => void;
  onNicknameChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onReset: () => void;
}

interface StatBarProps {
    readonly label: string;
    readonly value: number;
    readonly colorClass: string;
    readonly barId: string;
}

    function StatBar({ label, value, colorClass, barId }: Readonly<StatBarProps>) {
        const width = Math.min(100, Math.round((value / 130) * 100));
        return (
            <div className="flex flex-col gap-1">
            <div className="flex justify-between font-label-sm text-label-sm">
                <span className="text-on-surface-variant font-medium">{label}</span>
                <span className="font-bold text-on-surface" id={barId}>
                {value}
                </span>
            </div>
            <div className="w-full bg-surface-container-highest rounded-full h-2 overflow-hidden">
                <div
                className={`${colorClass} h-full rounded-full transition-all duration-500`}
                style={{ width: `${width}%` }}
                />
            </div>
            </div>
        );
    }

export default function index({
  pokemon,
  caughtStatus,
  nickname,
  date,
  onToggleCapture,
  onNicknameChange,
  onDateChange,
  onReset,
}: InspectorProps) {
    const pokemonName = pokemon?.name ?? "";
    const value: any = usePokemonAPi('https://pokeapi.co/api/v2/pokemon-species/', pokemonName);
    const stat: any = usePokemonAPi('https://pokeapi.co/api/v2/pokemon/', pokemonName);
    useEffect(() => {
    }, [value, stat])
    if(value.isPending ) return 'Loading'
    if(stat.isPending ) return 'Loading'


  const typeBadgeClass: keyof TypeStyleMap | null =
    pokemon?.typeLabel && pokemon.typeLabel in TYPE_STYLES
      ? (pokemon.typeLabel as keyof TypeStyleMap)
      : null;

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-md p-space-lg flex flex-col gap-space-lg">
      <div className="flex items-center justify-between">
        <button
          onClick={onReset}
          className="inline-flex items-center gap-space-xs font-label-md text-label-md text-tertiary hover:underline"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>All Specimens</span>
        </button>
        <div className="flex items-center gap-space-xs">
          <span className="px-space-sm py-0.5 rounded bg-surface-container font-mono font-label-sm text-label-sm text-on-surface-variant">
            #{pokemon?.id}
          </span>
          <span
            className={`px-space-sm py-0.5 rounded-full font-label-sm text-label-sm font-bold flex items-center gap-1 ${
              caughtStatus
                ? "bg-secondary-container/30 text-on-secondary-fixed-variant"
                : "bg-surface-container text-on-surface-variant"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                caughtStatus ? "bg-secondary" : "bg-on-surface-variant"
              }`}
            />
            <span>{caughtStatus ? "Captured" : "Unregistered"}</span>
          </span>
        </div>
      </div>

      <div className="relative w-full aspect-[4/3] rounded-xl bg-gradient-to-tr from-surface-container-high via-surface-container-low to-surface-container-lowest flex items-center justify-center p-space-md overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <svg className="w-48 h-48 animate-spin" style={{ animationDuration: "30s" }} viewBox="0 0 100 100">
            <circle
              className="text-on-surface"
              cx="50"
              cy="50"
              fill="none"
              r="45"
              stroke="currentColor"
              strokeDasharray="6 4"
              strokeWidth="1.5"
            />
            <circle
              className="text-on-surface"
              cx="50"
              cy="50"
              fill="none"
              r="28"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
        </div>
        <img
          className="w-full h-full object-contain relative z-10 drop-shadow-lg transition-transform duration-300 hover:scale-105"
          alt={pokemon?.name}
          src={pokemon?.imgDetail || pokemon?.img}
        />
        <div className="absolute bottom-space-md left-space-md z-20">
          <span
            className={`px-space-md py-1 rounded-full font-label-sm text-label-sm uppercase font-bold shadow-sm ${
              typeBadgeClass ? TYPE_STYLES[typeBadgeClass] : "bg-surface-container-high text-on-surface"
            }`}
          >
            {pokemon?.typeLabel}
          </span>
        </div>
      </div>

      <div>
        <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
          {pokemon?.name}
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">
          {value?.data?.flavor_text_entries?.[0]?.flavor_text}
        </p>
      </div>

      <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">
            &lt;Pokemon Details&gt;
          </span>
          <span className="font-label-sm text-label-sm text-tertiary">
            Base Stat Total: {Number(stat?.data?.stats?.[0]?.base_stat) + Number(stat?.data?.stats?.[1]?.base_stat) + Number(stat?.data?.stats?.[2]?.base_stat)}
          </span>
        </div>
        <StatBar label="HP (Health)" value={stat?.data?.stats?.[0]?.base_stat} colorClass="bg-primary" barId="stat-hp-val" />
        <StatBar label="Attack" value={stat?.data?.stats?.[1]?.base_stat} colorClass="bg-secondary" barId="stat-atk-val" />
        <StatBar label="Defense" value={stat?.data?.stats?.[2]?.base_stat} colorClass="bg-tertiary" barId="stat-def-val" />
      </div>

      <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col gap-space-md">
        <div className="flex items-center justify-between">
          <h3 className="font-label-lg text-label-lg text-on-surface font-bold uppercase tracking-wider">
            Status &amp; Log
          </h3>
          <span className="material-symbols-outlined text-secondary text-[20px]">20mp</span>
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-label-sm text-label-sm uppercase text-on-surface-variant" htmlFor="input-nickname">
            Nickname
          </label>
          <div className="relative">
            <input
              id="input-nickname"
              value={nickname}
              onChange={(e) => onNicknameChange(e.target.value)}
              placeholder="Enter Nickname"
              type="text"
              className="w-full px-space-md py-space-sm rounded-lg bg-secondary-container/15 text-on-surface placeholder:text-on-surface-variant font-body-md text-body-md focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary transition-all"
            />
            <span className="material-symbols-outlined absolute right-space-md top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
              badge
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-label-sm text-label-sm uppercase text-on-surface-variant" htmlFor="input-date">
            Capture Date (YYYY-MM-DD)
          </label>
          <div className="relative">
            <input
              id="input-date"
              type="date"
              value={date}
              onChange={(e) => onDateChange(e.target.value)}
              className="w-full px-space-md py-space-sm rounded-lg bg-secondary-container/15 text-on-surface placeholder:text-on-surface-variant font-body-md text-body-md focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary transition-all"
            />
            <span className="material-symbols-outlined absolute right-space-md top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
              event
            </span>
          </div>
        </div>

    

        <div className="flex flex-col gap-space-xs pt-space-xs">
          <button
            onClick={onToggleCapture}
            className={`w-full py-space-md px-space-lg rounded-xl font-headline-sm text-headline-sm text-on-primary active:scale-[0.98] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-space-sm ${
              caughtStatus ? "bg-primary hover:bg-primary-container" : "bg-tertiary hover:bg-tertiary-container"
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">
              {caughtStatus ? "check_circle" : "add_task"}
            </span>
            <span>{caughtStatus ? "Update Capture Log" : "Tag as Captured"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}