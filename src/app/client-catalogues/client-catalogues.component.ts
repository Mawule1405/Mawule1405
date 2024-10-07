import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/comptes/auth.service';
import { ProductService } from '../services/catalogue/product.service';
import { PanierService } from '../services/paniers/panier.service';
import { Panier } from '../model/Panier';
import { Client } from '../model/Client';
import { Article } from '../model/Article';
import { SpecialitePharmaceutique } from '../model/SpecialitePharmaceutique';
import { SpecialityService } from '../services/catalogue/speciality.service';
import { FormGaleniqueService } from '../services/catalogue/form-galenique.service';
import { FormeGalenique } from '../model/FormeGalenique';

@Component({
  selector: 'app-client-catalogues',
  templateUrl: './client-catalogues.component.html',
  styleUrl: './client-catalogues.component.css'
})
export class ClientCataloguesComponent implements OnInit {

  compteInfo!: Client;
  panierClient!: Panier;
  produitCourant : any
  lesProduits : any =[]

  lesSpecialites : Array<SpecialitePharmaceutique> = []
  lesFormGaleniques: Array<FormeGalenique> = []

  constructor(private authService: AuthService,
              private panierService: PanierService,
              private productService: ProductService,
              private specialteService: SpecialityService,
              private formeGaleniqueService: FormGaleniqueService

  ) { }

  ngOnInit(): void {
    // Récupérer les informations du compte au chargement du composant
    const compteInfo = this.authService.getCompteInfo();

    if(compteInfo){
      
      this.recupererLesProduit()
      this.getPanierClient()
      this.getFormeGaleniques()
      this.getSpecialites()
     
      
    }else{
     
      this.deconnexion()
    }
    
    
  }

  deconnexion() {
    this.authService.logout();
    // Redirection après déconnexion
  }

  getPanierClient(){
    
      let valeurStocker = this.authService.getPanierClient()
     
      if(valeurStocker){
        this.panierClient = valeurStocker
       
      }else{
        this.deconnexion()
      }
  }

  ajouterAuPanier(article : Article){
    this.produitCourant=0
  }

  recupererLesProduit(){
    this.productService.getTousLesMedicaments().subscribe({
      next : medicaments=> this.lesProduits = medicaments,
      error: err => console.log("Erreur de chargement des médicaments")

    })
  }

  getSpecialites(){
    this.specialteService.getAllProductsSpecialities().subscribe({
      next: spec => this.lesSpecialites = spec,
      error: err=> console.log("=============>"+err)
    })
  }

  getFormeGaleniques(){
    this.formeGaleniqueService.getAllFormGaleniques().subscribe({
      next: formes=> this.lesFormGaleniques = formes,
      error: err=> console.log("============>"+err)
    })
  }

}
