/* ============================================================
   TYPES
   ============================================================ */

export type PokemonType =
  | "Electric"
  | "Grass"
  | "Fire"
  | "Water"
  | "Ghost"
  | "Fighting"
  | "Normal";

export type FilterType = "all" | "electric" | "grass" | "fire" | "water" | "ghost";

export type BallKey = "ultra" | "great" | "poke" | "master";

export type Layout = "grid" | "list";

export type ActiveTab = "all" | "captured";

export interface Pokemon {
  id: string;
  name: string;
  type: string;
  typeLabel: PokemonType;
  nickname: string;
  date: string;
  caught: boolean;
  ball: string;
  hp: number;
  atk: number;
  def: number;
  description: string;
  img: string;
  imgDetail?: string;
  selected?: boolean;
}

export interface BallOption {
  key: BallKey;
  label: string;
}

export interface ToastState {
  visible: boolean;
  message: string;
}

export type TypeStyleMap = Record<PokemonType, string>;



export interface PokemonSpecies {
  id: number;
  name: string;
  flavor_text_entries: {
    flavor_text: string;
    language: { name: string; url: string };
    version: { name: string; url: string };
  }[];
  genera: {
    genus: string;
    language: { name: string; url: string };
  }[];
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  types: {
    slot: number;
    type: { name: string; url: string };
  }[];
  stats: {
    base_stat: number;
    effort: number;
    stat: { name: string; url: string };
  }[];
  abilities: {
    ability: { name: string; url: string };
    is_hidden: boolean;
    slot: number;
  }[];
  sprites: {
    front_default: string | null;
    other: {
      "official-artwork": { front_default: string | null };
    };
  };
}