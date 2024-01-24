import axios from "axios";
import { URL_API } from "../../../shared/env/env";
import { TAILLE_PAGE } from "../../../shared/constants/constants";


export const findAllFavori = (page: number) => axios.get(`${URL_API}/favoris?page=${page}&taille=${TAILLE_PAGE}`)