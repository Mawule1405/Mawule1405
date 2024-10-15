import { Utilisateur } from "./Utilisateur"

export interface Agent extends Utilisateur {
   
    matriculeAgent: string
    nomAgent: string
    prenomAgent: string
  }

  