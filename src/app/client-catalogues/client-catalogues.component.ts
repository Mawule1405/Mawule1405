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
import { ProfilService } from '../services/comptes/profil.service';
import { Medicament } from '../model/Medicament';
import { DispositifMedical } from '../model/DispositifMedical';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LignePanier } from '../model/LignePanier';

@Component({
  selector: 'app-client-catalogues',
  templateUrl: './client-catalogues.component.html',
  styleUrl: './client-catalogues.component.css'
})
export class ClientCataloguesComponent implements OnInit {

  compte!: Client;
  panierClient!: Panier;
  lignePanier! : any;
  produitCourant : any
  lesMedicaments : Medicament[] =[]
  lesDispositifsMedicaux : DispositifMedical[]= []

  lesSpecialites : Array<SpecialitePharmaceutique> = []
  lesFormGaleniques: Array<FormeGalenique> = []

  formulaireDeRechercheEtFiltre! : FormGroup
  formulaireAjoutAuPanier! : FormGroup

  produitAjouter! : Medicament | DispositifMedical

  estVisibleLefFormulaireDajout = false

  constructor(private authService: AuthService,
              private profilService: ProfilService,
              private panierService: PanierService,
              private productService: ProductService,
              private specialteService: SpecialityService,
              private formeGaleniqueService: FormGaleniqueService,
              private fb : FormBuilder

  ) { }

  ngOnInit(): void {
    // Récupérer les informations du compte au chargement du composant
    const ID = this.authService.getCompteID();

    if(ID){
      
      this.recupererLesInformationsDuClients(ID.id)
      this.formulaireAjoutAuPanier = this.creerLeFormulaireDajoutDunProduitAuPanier()
      
    }else{
     
      this.deconnexion()
    }
    
    
  }


  //Se déconnecter du compte
  deconnexion() {
    this.authService.logout();
  }


  //recuperer les informations du clients
  recupererLesInformationsDuClients(id : string){
    this.profilService.recupererUnCompteClient(id).subscribe({
      next: value=>{
        this.compte = value
        this.recupererLesMedicaments()
        this.recupererLesDispositifsMedicaux()
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
  ajouterAuPanier(article : Medicament | DispositifMedical){
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

  //Récupérer tous les dispositifs médicaux
  recupererLesDispositifsMedicaux(){
    this.productService.recupererTousLesDispositifsMedicaux().subscribe({
      next: values=> this.lesDispositifsMedicaux = values.filter(dispo=> dispo.etat=='NON_RETIRE'),
      error: err=> console.log("Erreur de récupération des dispositifs médicaux")
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

  //Recherche par mot cle
  rechercherParMotCle(){

  }

  //Formulaire d'enrégistrement d'ajout d'un produit au panier
  creerLeFormulaireDajoutDunProduitAuPanier(){
    return this.fb.group({
      quantite : this.fb.control(1, [Validators.required, Validators.min(1)]),
    })
  }

  //Valider le formulaire
  validerQuantite(){
    if(this.formulaireAjoutAuPanier.valid){
      if(confirm("Veuillez confirmer l'Ajout")){
        let quantite = this.formulaireAjoutAuPanier.value.quantite
        let lignePanier ={quantite: quantite, 
                          article: {id : this.produitAjouter.id},
                          panier: this.panierClient
                        } 
       

        alert(JSON.stringify(lignePanier))
        this.fermerFormulaireDajout()
      }
    }
  }

}
