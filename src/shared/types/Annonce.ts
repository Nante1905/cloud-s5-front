import { Marque } from "./Marque";
import { Utilisateur } from "./Utilisateur";
import { Voiture } from "./Voiture";

export interface Photo {
    url: string,
}

export interface Annonce {
    id: number,
    reference: string,
    description: string,
    creation: string,
    prix: number,
    commission: number,
    nbVues: number,
    utilisateur: Utilisateur,
    voiture: Voiture,
    photos: Photo[],
}

interface ModeleDTO {
    id: number,
    nom: string
}

export interface AnnonceGeneral {
    id: number,
    reference: string,
    marque: Marque,
    prix: number,
    creation: string,
    modele: ModeleDTO,
    utilisateur: Utilisateur,
    photos: Photo[],
    etat: number
    favori: boolean
}