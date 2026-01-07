export interface SteamPrice {
  currency: string;
  initial: number;
  final: number;
  discount_percent: number;
  free: boolean;
}

export interface SteamPlatforms {
  windows: boolean;
  mac: boolean;
  linux: boolean;
}

export interface SteamSearchGame {
  appid: number;
  name: string;
  tiny_image: string;
  price?: SteamPrice;
  platforms: SteamPlatforms;
}

export interface SteamGameDetails {
  steam_appid: number;
  name: string;
  header_image: string;
  short_description: string;
  genres: {
    id: string;
    description: string;
  }[];
  screenshots: {
    path_full: string;
  }[];
  price_overview?: SteamPrice;
}

export interface SteamSearchResponse {
  success: number;
  total_count: number;
  page: number;
  items: any[]; // lo mapea luego
}