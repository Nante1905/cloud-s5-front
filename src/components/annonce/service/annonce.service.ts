import axios from "axios";
import { URL_API } from "../../../shared/env/env";
import { FiltreRequest } from "../types/filtre.type";
import { TAILLE_PAGE } from "../../../shared/constants/constants";
import { http } from "../../../shared/services/interceptor/axios.interceptor";


// TODO: ovaina valide fa miandry endpoint ho vita
export const findAnnonceValideParPage = (page: number) =>
  http.get(`${URL_API}/annonces/nonValide?page=${page}&taille=${TAILLE_PAGE}`);

export const filtreAnnonce = (filtre: FiltreRequest, page: number) =>
  http.post(`${URL_API}/annonces/find?page=${page}&taille=${TAILLE_PAGE}`, filtre);

export const toggleFavori = (idAnnonce: number) => http.put(`${URL_API}/annonces/${idAnnonce}/toggle_favoris`)