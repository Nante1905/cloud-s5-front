import { Categorie } from "../../../shared/types/Categorie";
import { Marque } from "../../../shared/types/Marque";
import { Modele } from "../../../shared/types/Modele";

export interface FiltreRequest {
    motCle: string | null,
    categorie: Categorie[] | null,
    marque: Marque[] | null,
    modele: Modele[] | null,
    anneeMiseCirculation?: string,
    prixMin?: string,
    prixMax?: string;
}

export const initialFiltre: FiltreRequest = {
    motCle: null,
    categorie: null,
    marque: null,
    modele: null
}