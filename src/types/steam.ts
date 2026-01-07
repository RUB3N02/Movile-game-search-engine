export interface SteamApp {
  appid: number;
  name: string;
}

export interface SteamSearchResult {
  apps: SteamApp[];
  total: number;
}

export type SteamAppType =
  | 'game'
  | 'dlc'
  | 'software'
  | 'demo'
  | 'music'
  | 'tool'
  | 'unknown';

export interface SteamEnrichedApp extends SteamApp {
  type?: SteamAppType;
}
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