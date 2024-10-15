import { Client } from "./Client";
import { Facture } from "./Facture";

export interface Commande{
    id: string,
    montantTotalCommande : number,
    dateCommande : Date,
    etatCommande : string,
    client : Client,
    facture: Facture,
}

