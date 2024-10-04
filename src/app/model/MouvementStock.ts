import {Article} from "./Article";
import {Medicament} from "./Medicament";

export interface MouvementStock{

  id: string;
  quantite: number;
  typeMouvement: string;
  dateMouvement: Date;
  prixAchatUnitaire: number,
  prixVenteUnitaire: number,
  dateExpiration: Date;
  article: Article;

}
