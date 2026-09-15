// src/hooks/usePokemonList.ts
import { useQuery } from '@tanstack/react-query';

interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: any;

}


export function usePokemonAPi(pathname: string, value: string,  limit?: number , offset?: number ) {

  return useQuery<PokemonListResponse>({
    queryKey: ['pokemon-list',  pathname, value, limit, offset],
    queryFn: async () => {
      const res = await fetch(
        `${pathname}${!limit ? value : `?limit=${limit}&offset=${offset}`}`
      );
      if (!res.ok) throw new Error('Failed to fetch Pokémon list');
      return res.json();
    },
    // enabled: !!value,
  });
}

