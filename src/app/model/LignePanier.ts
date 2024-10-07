import { Article } from "./Article";
import { Medicament } from "./Medicament";
import { Panier } from "./Panier";

export interface LignePanier{
    id: string,
    quantite: number,
    panier: Panier
    article : Medicament
}