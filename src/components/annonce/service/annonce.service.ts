import { URL_API } from "../../../shared/env/env";
import { FiltreRequest } from "../types/filtre.type";
import { TAILLE_PAGE } from "../../../shared/constants/constants";
import { http } from "../../../shared/services/interceptor/axios.interceptor";

export const filtreAnnonce = (filtre: FiltreRequest, page: number) =>
  http.post(`${URL_API}/annonces/find?page=${page}&taille=${TAILLE_PAGE}`, filtre);

export const toggleFavori = (idAnnonce: number) => http.put(`${URL_API}/annonces/${idAnnonce}/toggle_favoris`)