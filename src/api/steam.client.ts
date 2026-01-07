

export const STEAM_BASE_URL = "https://store.steampowered.com";

 export const steamFetch= async (url:string)=> {
    const res =await fetch(url);
    if (!res.ok) throw new Error('Steam error');
    return res.json();
 };
