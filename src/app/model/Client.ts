import { Utilisateur } from "./Utilisateur"

export interface Client extends Utilisateur{
    
    nomEntreprise: string
    numeroAccreditation:string,
    typeStructure: string,
    nomDuResponsable: string,
    numeroContactResponsable: string
    
  }

