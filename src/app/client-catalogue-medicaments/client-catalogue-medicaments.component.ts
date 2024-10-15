import { Component, OnInit } from '@angular/core';
import { SpecialitePharmaceutique } from '../model/SpecialitePharmaceutique';
import { FormeGalenique } from '../model/FormeGalenique';
import { Medicament } from '../model/Medicament';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/comptes/auth.service';
import { ProfilService } from '../services/comptes/profil.service';
import { PanierService } from '../services/paniers/panier.service';
import { ProductService } from '../services/catalogue/product.service';
import { SpecialityService } from '../services/catalogue/speciality.service';
import { FormGaleniqueService } from '../services/catalogue/form-galenique.service';
import { Client } from '../model/Client';

@Component({
  selector: 'app-client-catalogue-medicaments',
  templateUrl: './client-catalogue-medicaments.component.html',
  styleUrl: './client-catalogue-medicaments.component.css'
})
export class ClientCatalogueMedicamentsComponent implements OnInit{

  lesSpecialites: SpecialitePharmaceutique[] = []
  lesFormGaleniques: FormeGalenique[] = []
  lesMedicaments: Medicament[] = []
  compte! : Client
  estVisibleLefFormulaireDajout = false
  produitAjouter: any

  formulaireAjoutAuPanier! : FormGroup


  constructor(
    private authService: AuthService,
    private profilService: ProfilService,
    private panierService: PanierService,
    private productService: ProductService,
    private specialteService: SpecialityService,
    private formeGaleniqueService: FormGaleniqueService,
    private fb : FormBuilder
    
  ){

  }

  ngOnInit(): void {
      // Récupérer les informations du compte au chargement du composant
    const ID = this.authService.getCompteID();

    if(ID){
      
      this.recupererLesInformationsDuClients(ID.id)
      this.formulaireAjoutAuPanier = this.creerLeFormulaireDajoutDunProduitAuPanier()
      
    }else{
     
      this.authService.logout()
    }
  }

   //Formulaire d'enrégistrement d'ajout d'un produit au panier
   creerLeFormulaireDajoutDunProduitAuPanier(){
    return this.fb.group({
      quantite : this.fb.control(1, [Validators.required, Validators.min(1)]),
    })
  }

  //Récupérer de toutes les spécialités
  getSpecialites(){
    this.specialteService.getAllProductsSpecialities().subscribe({
      next: spec => this.lesSpecialites = spec,
      error: err=> console.log("=============>"+err)
    })
  }


  //Récupération de toutes les formes galéniques
  getFormeGaleniques(){
    this.formeGaleniqueService.getAllFormGaleniques().subscribe({
      next: formes=> this.lesFormGaleniques = formes,
      error: err=> console.log("============>"+err)
    })
  }

  //recuperer les informations du clients
  recupererLesInformationsDuClients(id : string){
    this.profilService.recupererUnCompteClient(id).subscribe({
      next: value=>{
        this.compte = value
        this.recupererLesMedicaments()
        this.getPanierClient()
        this.getFormeGaleniques()
        this.getSpecialites()
      },
      error: err=> console.log("Erreur de récupération du compte client")
    })
  }


  //recuperer le panier du client
  getPanierClient(){
     
  }

  //Ajouter un produit au panier
  ajouterAuPanier(article : Medicament ){
    this.produitAjouter = article
    this.estVisibleLefFormulaireDajout = true
    
  }

  //Fermer le formulaire d'ajout d'un produit au panier
  fermerFormulaireDajout(){
      this.estVisibleLefFormulaireDajout = false
      this.formulaireAjoutAuPanier.reset()
  }


  //Recupérer tous les médicaments
  recupererLesMedicaments(){
    this.productService.getTousLesMedicaments().subscribe({
      next : medicaments=> this.lesMedicaments = medicaments.filter(medoc=> medoc.etat=='NON_RETIRE'),
      error: err => console.log("Erreur de chargement des médicaments")

    })
  }

  //Valider l'ajout de médicament au panier
  validerQuantite(){

  }
}
