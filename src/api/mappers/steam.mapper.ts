import { SteamEnrichedApp, SteamAppType } from '../../types/steam';

export const mapEnrichedApp = (
  item: any
): SteamEnrichedApp => ({
  appid: item.appid,
  name: item.name,
  type: item.type as SteamAppType, // Solo si viene de Store API
});
