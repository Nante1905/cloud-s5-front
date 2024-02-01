export interface HistoriqueDetails {
    date: string,
    status: string
}

export interface Historique {
    id: number,
    marque: string,
    modele: string,
    prix: number,
    reference: string,
    historiques: HistoriqueDetails[]
}