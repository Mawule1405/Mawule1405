import { Component } from '@angular/core';
import { LignePanier } from '../model/LignePanier';
import { Panier } from '../model/Panier';
import { PanierService } from '../services/paniers/panier.service';

@Component({
  selector: 'app-client-panier',
  templateUrl: './client-panier.component.html',
  styleUrl: './client-panier.component.css'
})
export class ClientPanierComponent {
  lesLignesPaniers : LignePanier[] =[]
  panierEstAfficher = false;
  ligneCourant! : LignePanier | null;
  panierClient!: Panier;


  constructor(private panierService: PanierService){

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
