import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../../model/Client';
import { PanierService } from '../paniers/panier.service';
import { Panier } from '../../model/Panier';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  panierClient! : Panier

  constructor(private router: Router, private panierService: PanierService) { }

  // Méthode pour définir les informations du compte après connexion
  setCompteInfo(compte: any) {
    sessionStorage.setItem("client", JSON.stringify(compte));
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

  // Méthode pour obtenir les informations du compte
  getCompteInfo() :Client | null {
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
  

  // Méthode pour vérifier si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return this.getCompteInfo !== null;
  }

  // Méthode pour se déconnecter (réinitialiser les informations du compte)
  logout() {
    this.router.navigate(['/home']);
  }
}
