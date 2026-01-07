

export const STEAM_BASE_URL = "https://store.steampowered.com";

 export const steamFetch= async <T>(url:string): Promise<T> => {
   const res =await fetch(url, {
      headers: { 'Accept': 'application/json' },
   });
   if (!res.ok){ 
      throw new Error('Steam error');
   }
    return res.json() as Promise<T>;
 };
// Acepta un tipo genérico <T>