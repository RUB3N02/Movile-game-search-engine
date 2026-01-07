import { steamFetch } from './steam.client';
import { SteamApp } from '../types/steam';

interface SearchParams {
  term?: string;
  page?: number;
}

const PAGE_SIZE = 20;

type GetAppListResponse = {
  applist: {
    apps: SteamApp[];
  };
};

export const searchGames = async (
  params: SearchParams
): Promise<{
  games: SteamApp[];
  total: number;
}> => {
  const term = params.term?.toLowerCase() ?? '';
  const page = params.page ?? 1;

  const res = await steamFetch<GetAppListResponse>(
    '/ISteamApps/GetAppList/v2/?format=json'
  );

  const filtered = res.applist.apps.filter(app =>
    app.name.toLowerCase().includes(term)
  );

  const start = (page - 1) * PAGE_SIZE;
  const paginated = filtered.slice(start, start + PAGE_SIZE);

  return {
    games: paginated,
    total: filtered.length,
  };
};
