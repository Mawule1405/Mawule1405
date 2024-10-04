import { Commande } from "./commande";

export interface Reclamation{
    id : string,
    descriptionReclamation : string,
    dateReclamation : Date,
    etatReclamation : string,
    preuve: string,
    commande : Commande,
}