import axios from "axios";
import { URL_API } from "../../../shared/env/env";
import { FiltreRequest } from "../types/filtre.type";

export const TAILLE_PAGE = 4;

// TODO: ovaina valide fa miandry endpoint ho vita
export const findAnnonceValideParPage = (page: number) =>
  axios.get(`${URL_API}/annonces/nonValide?page=${page}&taille=${TAILLE_PAGE}`);

export const filtreAnnonce = (filtre: FiltreRequest, page: number) =>
  axios.post(`${URL_API}/annonces/find?page=${page}&taille=${TAILLE_PAGE}`, filtre);