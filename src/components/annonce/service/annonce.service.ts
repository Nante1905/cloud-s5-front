import { FiltreRequest } from "../types/filtre.type";
import { TAILLE_PAGE } from "../../../shared/constants/constants";
import { http } from "../../../shared/services/interceptor/axios.interceptor";
import dayjs from "dayjs";
import { Annonce, AnnonceGeneral, Photo } from "../../../shared/types/Annonce";

export const filtreAnnonce = (filtre: FiltreRequest, page: number) =>
  http.post(`/annonces/find?page=${page}&taille=${TAILLE_PAGE}`, filtre);

export const toggleFavori = (idAnnonce: number) => http.put(`/annonces/${idAnnonce}/toggle_favoris`);

export const parseDate = (date: string) => {
  const day = dayjs(date);
  if (day.isSame(new Date())) {
    return day.format("HH:mm");
  } else {
    return day.format("DD MMMM YYYY");
  }
};

export const getImageOfAnnonceGen = (annonce: AnnonceGeneral): Photo[] => {
  if (annonce.photos.length == 0) {
    return [{ url: annonce.marque.logo as string }];
  } else {
    return annonce.photos;
  }
};

export const getImageOfAnnonce = (annonce: Annonce): Photo[] => {
  if (annonce.photos.length == 0) {
    return [{ url: annonce.voiture.modele.marque.logo as string }];
  } else {
    return annonce.photos;
  }
};

export const getById = (id: string) => http.get(`/annonces/${id}`);

export const getDiscussion = (proprio: number) => http.post(`/discussions`, { targetUserId: proprio });