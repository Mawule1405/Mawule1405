import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/comptes/auth.service';
import { Router } from '@angular/router';

import { Client } from '../model/Client';
import { PanierService } from '../services/paniers/panier.service';
import { Panier } from '../model/Panier';
import { LignePanier } from '../model/LignePanier';

@Component({
  selector: 'app-client-nav-bar',
  templateUrl: './client-nav-bar.component.html',
  styleUrl: './client-nav-bar.component.css'
})
export class ClientNavBarComponent implements OnInit {
  lesActions = [
    {index:0, title:"Catalogues", router:"/client/catalogues/tous-les-produits"},
    {index:1, title:"Tous les produits", router:"/client/catalogues/tous-les-produits"},
    {index:2, title:"Médicaments", router:"/client/catalogues/medicaments"},
    {index:3, title:"Autres produits", router:"/client/catalogues/autres-produits"},
    {index:4, title:"Commandes", router:"/client/commandes/nouvelles-commandes"},
    {index:5, title:"Nouvelles commandes", router:"/client/commandes/nouvelles-commandes"},
    {index:6, title:"Anciennes commandes", router:"/client/commandes/anciennes-commandes"},
    {index:7, title:"Reclamations", router:"/client/commandes/nouvelles-reclamations"},
    {index:8, title:"Nouvelles reclamations", router:"/client/commandes/nouvelles-reclamations"},
    {index:9, title:"Anciennes reclamations", router:"/client/commandes/anciennes-reclamations"},

  ]
   utilisateur! : Client;
   panierClient! : Panier;
   lesLignesPaniers : LignePanier[] =[]
   panierEstAfficher = false;
   ligneCourant! : LignePanier | null;
   

  
  constructor(private authService: AuthService,
              private panierService: PanierService,
              ){}

  ngOnInit(): void {
    const userData = this.authService.getCompteInfo()
    if (userData) {
      this.utilisateur = userData;
      this.getPanierClient(this.utilisateur)
      this.getLignesPanier(this.panierClient)
      
      
    } else {
      this.deconnexion()
    }
  }

  deconnexion(){
    this.authService.logout();
    
  }

  getPanierClient(client : Client){
    this.panierService.trouverPanier(client)
      let valeurStocker = this.panierService.getPanierDuStock()
      if(valeurStocker){
        this.panierClient = valeurStocker
      
      }else{
        this.deconnexion()
      }
  }

  voirPanier(){
      this.panierEstAfficher = true
      this.getLignesPanier(this.panierClient)
  }

  getLignesPanier(panier: Panier){
    this.panierService.getLignePanier(panier).subscribe({
      next: value=> this.lesLignesPaniers = value,
      error: err=> console.log("Erreur de chargement des lignes paniers")
    })
  }

  retirerDuPanier(ligne: LignePanier){
      if(confirm("Voulez vous retirer ce produit?")){
        this.panierService.deleteLignePanier(ligne).subscribe({
          next: ligne=> this.getLignesPanier(this.panierClient),
          error: err=> console.log("Erreur de chargement")
      })
      }
  }

  positionnerLesFormulaires(ligne: LignePanier) {
    let formElement = document.getElementById(`form-${ligne.id}`);
  
    if (formElement) {
      // Appliquer des styles CSS pour centrer le formulaire
      formElement.style.position = 'fixed'; // Utiliser 'fixed' pour le garder centré même en défilant
      formElement.style.top = '50%'; // Placer le centre de l'élément à 50% de la hauteur
      formElement.style.left = '50%'; // Placer le centre de l'élément à 50% de la largeur

    }
  }
  

  changerLaQuantite(ligne: LignePanier){
    this.ligneCourant = ligne,
    this.positionnerLesFormulaires(ligne)
    
  }

  fermerFormulaireLigne(){
    this.ligneCourant = null;
  }

  fermerPanier(){
    this.panierEstAfficher = false
  }

}
