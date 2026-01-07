import { useState, useEffect } from "react";
import { steamFetch } from "../api/steam.client";

export interface SteamAppFromStore {
  id: number;
  name: string;
  type: string;       // "game", "dlc", "software", etc.
  tiny_image: string;
  price?: {
    currency: string;
    initial: number;
    final: number;
    discount_percent: number;
    free: boolean;
  } | null;
}

const PAGE_SIZE = 20;

export const useSearchApps = (term: string) => {
  const [apps, setApps] = useState<SteamAppFromStore[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalApps, setTotalApps] = useState(0);

  // Reinicia página cuando cambia el término
  useEffect(() => {
    setPage(1);
  }, [term]);

  useEffect(() => {
    async function fetchApps() {
      setLoading(true);

      try {
        // Si no hay término, usamos "a" para devolver resultados por defecto
        const searchTerm = term.trim() === "" ? "a" : term;
        const endpoint = `/storesearch/?term=${encodeURIComponent(searchTerm)}&l=spanish&cc=us`;

        const data = await steamFetch<{ total: number; items: SteamAppFromStore[] }>(
          endpoint
        );

        // Total de apps
        setTotalApps(data.total || data.items.length);

        // Paginación local
        const start = (page - 1) * PAGE_SIZE;
        const newApps = data.items.slice(start, start + PAGE_SIZE);

        // Agregar a la lista existente si es scroll infinito
        setApps((prev) => (page === 1 ? newApps : [...prev, ...newApps]));
      } catch (error) {
        console.error("Error fetching apps:", error);
        setApps([]);
        setTotalApps(0);
      } finally {
        setLoading(false);
      }
    }

    fetchApps();
  }, [term, page]);

  const loadMore = () => {
    if (apps.length < totalApps) setPage((prev) => prev + 1);
  };

  return { apps, loading, loadMore, totalApps };
};
