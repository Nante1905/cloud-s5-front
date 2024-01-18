import axios from "axios";
import { URL_API } from "../../../shared/env/env";

// TODO: ovaina valide fa miandry endpoint ho vita
export const findAnnonceValideParPage = (page: number) =>
  axios.get(`${URL_API}/annonces/nonValide?page=${page}`);
