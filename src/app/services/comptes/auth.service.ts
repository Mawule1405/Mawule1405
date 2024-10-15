import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../../model/Client';
import { PanierService } from '../paniers/panier.service';
import { Panier } from '../../model/Panier';
import { HttpClient } from '@angular/common/http';
import {URL} from '../../model/URL'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  panierClient! : Panier

  constructor(private http: HttpClient, private router: Router, private panierService: PanierService) { }

  //verifier les informations de connecter
  connecter(cred: any):Observable<any> {
    return this.http.post<any>(`${URL.BASE_URL}${URL.CONNEXION_URL}?identifiantOuEmail=${cred.identifiant}&motDePasse=${cred.motDePasse}`,{})
  }

  // Méthode pour définir les informations du compte après connexion
  stockCompteID(Credential: any) {
    sessionStorage.setItem("client", JSON.stringify({"id": Credential.id}));
  }

  // Méthode pour obtenir les informations du compte
  getCompteID() :any {
      const clientData = sessionStorage.getItem("client");
      if (clientData) {
        try {
          return JSON.parse(clientData);
        } catch (error) {
          console.error("Erreur lors du parsing du client depuis sessionStorage", error);
          return null;
        }
      }
      return null;
    }


  stockPanier(compte : any){
    this.panierService.trouverPanier(compte)
  }



  getPanierClient(): Panier | null{
    const panierData = sessionStorage.getItem("panier")
    if (panierData) {
      try {
        let panier : Panier = JSON.parse(panierData)
        return panier;
      } catch (error) {
        console.error("Erreur lors du parsing du client depuis sessionStorage", error);
        return null;
      }
    }
    return null;
  }




  

  // Méthode pour vérifier si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return this.getCompteID() !== null;
  }

  // Méthode pour se déconnecter (réinitialiser les informations du compte)
  logout() {
    this.router.navigate(['/home']);
  }
}
