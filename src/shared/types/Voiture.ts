import { Categorie } from "./Categorie";
import { Couleur } from "./Couleur";

interface Marque {
    id?: number,
    nom: string,
    logo: string
}

interface Modele {
    id?: number,
    nom: string,
    nbPlace: number,
    nbPorte: number,
    anneeSortie: number,
    categorie: Categorie,
    marque: Marque
}

interface Vitesse {
    id?: number,
    nom: string
}

interface Energie {
    id?: number,
    nom: string
}

export interface Voiture {
    id?: number,
    consommation: number,
    kilometrage: number,
    etat: number,
    couleur: Couleur,
    modele: Modele,
    vitesse: Vitesse,
    energie: Energie
}