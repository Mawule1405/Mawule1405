import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Commande} from "../../model/commande";
import {URL} from "../../model/URL";
import { LigneCommande } from '../../model/LigneCommande';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  constructor(private http: HttpClient) { }

  getCommandesEnAttente():Observable<Array<Commande>>{
    return this.http.get<Array<Commande>>(`${URL.BASE_URL}${URL.COMMANDE_URL}?etatCommande=EN_ATTENTE`)
  }
  getCommandesEnCours():Observable<Array<Commande>>{
    return this.http.get<Array<Commande>>(`${URL.BASE_URL}${URL.COMMANDE_URL}?etatCommande=EN_COURS`)
  }
  getCommandesTraitees():Observable<Array<Commande>>{
    return this.http.get<Array<Commande>>(`${URL.BASE_URL}${URL.COMMANDE_URL}?etatCommande=TRAITEE`)
  }
  getCommandesLivree():Observable<Array<Commande>>{
    return this.http.get<Array<Commande>>(`${URL.BASE_URL}${URL.COMMANDE_URL}?etatCommande=LIVREE`)
  }
  getCommandesAnnulees():Observable<Array<Commande>>{
    return this.http.get<Array<Commande>>(`${URL.BASE_URL}${URL.COMMANDE_URL}?etatCommande=ANNULEE`)
  }

  updateCommande(commande: Commande): Observable<Commande>{
    return this.http.patch<Commande>(`${URL.BASE_URL}${URL.COMMANDE_URL}/${commande.id}`, commande)
  }

  /*Les lignes commandes*/
  getLigneCommandes(commande : Commande): Observable<Array<LigneCommande>>{
    return this.http.get<Array<LigneCommande>>(`${URL.BASE_URL}${URL.LIGNECOMMANDE_URL}?commande.id=${commande.id}`);
  }
}
