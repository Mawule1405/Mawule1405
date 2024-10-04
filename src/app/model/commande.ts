import { Client } from "./Client";

export interface Commande{
    id: string,
    montantTotalCommande : number,
    dateCommande : Date,
    etatCommande : string,
    client : Client,
}

