import { steamFetch, STEAM_BASE_URL } from './steam.client';

// El uso del ? ayuda a escribir funciones más flexibles y permite que los valores por defecto sean gestionados dentro de la función si es necesario 
// (por ejemplo, asignando valores predeterminados a esos parámetros dentro de la función).
export const searchGames = async (params: {
    term?: string;
    tags?: number[];
    page?: number;
}) => {
    const query = new URLSearchParams({
        query:'',
        infinite:'1',
        term: params.term ?? '',
        page: String(params.page ?? 1)
    });
    if (params.tags?.length){
        params.tags.forEach(tag =>
            query.append('tag', tag.toString())
        );
    }
    // Añadir múltiples valores para el parámetro tag a la URL, si es que se proporcionaron tags.
    return steamFetch(
        `${STEAM_BASE_URL}/search/results?${query}`
    );
}