
export interface Article {
    id: string;
    code: string;
    libelle: string;
    prixGenerique : number;
    description: string;
    quantiteStock: number;
    quantiteStockSeuil: number;
    etat: string;
    cheminImage: string ;
    isDeleted : boolean;
}




