import { SteamSearchGame,SteamGameDetails } from '../../types/steam';

export const mapSearchGame = (item: any): SteamSearchGame => ({
  appid: item.appid,
  name: item.name,
  tiny_image: item.tiny_image,
  price: item.price,
  platforms: item.platforms,
});

export const mapGameDetails = (data: any): SteamGameDetails => ({
  steam_appid: data.steam_appid,
  name: data.name,
  header_image: data.header_image,
  short_description: data.short_description,
  genres: data.genres ?? [],
  screenshots: data.screenshots ?? [],
  price_overview: data.price_overview,
});