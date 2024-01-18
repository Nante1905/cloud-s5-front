import { Utilisateur } from "./Utilisateur";
import { Voiture } from "./Voiture";

export interface Photo {
    url: string,
}

export interface Annonce {
    id: number,
    reference: string,
    description: string,
    dateCreation: string,
    prix: number,
    commission?: number,
    nbVues?: number,
    utilisateur: Utilisateur,
    voiture: Voiture,
    photos: Photo[]
}