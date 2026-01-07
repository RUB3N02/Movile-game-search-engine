import { useState, useEffect } from "react";
import { steamFetch } from "../api/steam.client";

export interface SteamAppFromStore {
  id: number;
  name: string;
  type: string; // game, dlc, software, etc.
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
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Resetear cuando cambia el término
  useEffect(() => {
    setApps([]);
    setPage(1);
    setTotalItems(0);
  }, [term]);

  // Llamada a la API cuando cambia term o page
  useEffect(() => {
    if (!term.trim()) return; // nada que buscar

    const fetchApps = async () => {
      setLoading(true);
      try {
        const data: any = await steamFetch(`/storesearch/?term=${term}&l=spanish&cc=us`);
        const itemsArray: SteamAppFromStore[] = Object.values(data.items || {}).map((app: any) => ({
          id: app.id,
          name: app.name,
          type: app.type || "APP",
          tiny_image: app.tiny_image,
          price: app.price || null,
        }));

        setTotalItems(itemsArray.length);

        // Paginación local
        const start = (page - 1) * PAGE_SIZE;
        const newApps = itemsArray.slice(start, start + PAGE_SIZE);

        setApps(prev => (page === 1 ? newApps : [...prev, ...newApps]));
      } catch (error) {
        console.error("Error fetching apps:", error);
        setApps([]);
      } finally {
        setLoading(false);
      }
    };

    fetchApps();
  }, [term, page]);

  const loadMore = () => {
    if (!loading && apps.length < totalItems) {
      setPage(prev => prev + 1);
    }
  };

  return { apps, loading, loadMore };
};
