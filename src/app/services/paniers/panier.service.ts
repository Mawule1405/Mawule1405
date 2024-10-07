import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import { Panier } from '../../model/Panier';
import {URL} from '../../model/URL';
import { Client } from '../../model/Client';
import { LignePanier } from '../../model/LignePanier';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  panierClient! : Panier

  constructor(private http: HttpClient) { }

  getPanier(client: Client):Observable<any>{
    
    return this.http.get<any>(`${URL.BASE_URL}${URL.PANIER_URL}?client.id=${client.id}`)
  }

  trouverPanier(client: Client) {
    this.getPanier(client).subscribe({
      next: (valeur) => {
        if (valeur) {
          
          this.panierClient = valeur[0]
          this.stockPanier(this.panierClient)
          
        }
      },
      error: (err) => console.log("Erreur de chargement du panier")
    });
  }
  

  stockPanier(panier: Panier){
    sessionStorage.setItem("panier", JSON.stringify(panier))
  }

  getPanierDuStock(): Panier | null {
    const panierStocke = sessionStorage.getItem("panier");
    if (panierStocke) {
      return JSON.parse(panierStocke); // Convertir la chaîne JSON en objet Panier
    }
    return null; // Retourner null si aucun panier n'est stocké
  }
  

  setLignePanier(ligne: LignePanier){
    
    this.http.patch(`${URL.BASE_URL}${URL.PANIER_URL}/${this.panierClient.id}`, this.panierClient)
    .subscribe({
      next : valuer => this.trouverPanier(this.panierClient.client) ,
      error: err=> console.log("Erreur de d'ajout de la ligne")
    })
  }

  getLignePanier(panier: Panier): Observable<Array<LignePanier>>{
    return this.http.get<Array<LignePanier>>(`${URL.BASE_URL}${URL.LIGNEPANIER_URL}?panier.id=${panier.id}`)
  }

  deleteLignePanier(ligne: LignePanier):Observable<LignePanier>{
    return this.http.delete<LignePanier>(`${URL.BASE_URL}${URL.LIGNEPANIER_URL}/${ligne.id}`)
  }
}
