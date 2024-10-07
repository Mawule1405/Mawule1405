import { Client } from "./Client";
import { LignePanier } from "./LignePanier";

export interface Panier{
    id: string;
    nombreLigne:number;
    client: Client;
    
}