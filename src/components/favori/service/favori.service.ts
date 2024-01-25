import { URL_API } from "../../../shared/env/env";
import { TAILLE_PAGE } from "../../../shared/constants/constants";
import { http } from "../../../shared/services/interceptor/axios.interceptor";


export const findAllFavori = (page: number) => http.get(`${URL_API}/favoris?page=${page}&taille=${TAILLE_PAGE}`)