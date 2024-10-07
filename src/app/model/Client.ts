import { Utilisateur } from "./utilisateur"

export interface Client extends Utilisateur{
    
    nomStructure: string
    numeroAccreditation:string,
    estOperationnel: boolean,
    email: string
    telephone:string
    adresse:string
    preuve:string
  }