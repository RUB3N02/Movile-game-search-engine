import { steamFetch, STEAM_BASE_URL } from './steam.client';
import { SteamSearchResponse, SteamSearchGame } from '../types/steam';
import { mapSearchGame } from './mappers/steam.mapper';

// El uso del ? ayuda a escribir funciones más flexibles y permite que los valores por defecto sean gestionados dentro de la función si es necesario 
// (por ejemplo, asignando valores predeterminados a esos parámetros dentro de la función).

interface SearchParams {
  term?: string;
  page?: number;
}

export const searchGames = async (
  params: SearchParams
): Promise<{
  games: SteamSearchGame[];
  total: number;
}> => {
  const query = new URLSearchParams({
    query: '',
    infinite: '1',
    term: params.term ?? '',
    page: String(params.page ?? 1),
  });

  const res = await steamFetch<SteamSearchResponse>(
    `${STEAM_BASE_URL}/search/results/?${query}`
  );

  return {
    games: (res.items ?? []).map(mapSearchGame),
    total: res.total_count,
  };
}