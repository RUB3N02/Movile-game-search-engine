

export const STEAM_BASE_URL = "https://store.steampowered.com/api";

export const steamFetch = async <T>(endpoint: string): Promise<T> => {
  const res = await fetch(`${STEAM_BASE_URL}${endpoint}`, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    const errorDetails = await res.text();
    throw new Error(`Steam API error: ${errorDetails}`);
  }

  return res.json() as Promise<T>;
};

// Acepta un tipo genérico <T>