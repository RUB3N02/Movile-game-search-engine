import { useEffect, useState } from 'react';
import { searchGames } from '../api/steam.search';
import { SteamSearchGame } from '../types/steam';

export function useSearchGames(term: string) {
  const [games, setGames] = useState<SteamSearchGame[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    searchGames({ term, page })
      .then(res => {
        setGames(prev =>
          page === 1 ? res.games : [...prev, ...res.games]
        );
      })
      .finally(() => setLoading(false));
  }, [term, page]);

  return {
    games,
    loading,
    loadMore: () => setPage(p => p + 1),
  };
}