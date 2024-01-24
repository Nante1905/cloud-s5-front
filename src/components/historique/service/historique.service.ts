import { URL_API } from "../../../shared/env/env";
import { TAILLE_PAGE } from "../../../shared/constants/constants";
import { http } from "../../../shared/services/interceptor/axios.interceptor";


export const findMyAnnonces = (page: number) => http.get(`${URL_API}/annonces/yours?page=${page}&taille=${TAILLE_PAGE}`)