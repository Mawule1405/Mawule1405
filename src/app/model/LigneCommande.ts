import {Article} from "./Article";
import {Commande} from "./commande";
import { Medicament } from "./Medicament";

export interface LigneCommande{
  id : string,
  quantiteLigneCommande: number,
  prixLigneCommande : number,
  medicament : Medicament,
  commande: Commande,
}


