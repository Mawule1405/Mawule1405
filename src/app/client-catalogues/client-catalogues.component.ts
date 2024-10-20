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
  lesMedicamentsInitiaux : Medicament[] =[]
  lesDispositifsMedicauxInitiaux : DispositifMedical[]= []

  lesSpecialites : Array<SpecialitePharmaceutique> = []
  lesFormGaleniques: Array<FormeGalenique> = []

  formulaireDeRecherche! : FormGroup
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
      this.formulaireDeRecherche = this.creerLeFormulaireDeRecherche()
      
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
      next : medicaments=>{ 
        this.lesMedicaments = medicaments.filter(medoc=> medoc.etat=='NON_RETIRE');
        this.lesMedicamentsInitiaux = [...this.lesMedicaments]
      },
      error: err => console.log("Erreur de chargement des médicaments")

    })
  }

  //Récupérer tous les dispositifs médicaux
  recupererLesDispositifsMedicaux(){
    this.productService.recupererTousLesDispositifsMedicaux().subscribe({
      next: values=>{ 
        this.lesDispositifsMedicaux = values.filter(dispo=> dispo.etat=='NON_RETIRE');
        this.lesDispositifsMedicauxInitiaux = [...this.lesDispositifsMedicaux]
      
      },
      error: err=> console.log("Erreur de récupération des dispositifs médicaux")
    })
  }

 //Créer le formulaire de recherche
 creerLeFormulaireDeRecherche(){
    return this.fb.group({
      key : this.fb.control('')
    })
 }

  //Recherche par mot cle
  rechercherParMotCle(){
    let key = this.formulaireDeRecherche.value.key
    if (key){
        this.lesDispositifsMedicaux = this.lesDispositifsMedicauxInitiaux.filter(dispo=>
          dispo.libelle.toLowerCase().includes(key.toLowerCase()))

        this.lesMedicaments = this.lesMedicaments.filter(medo => medo.libelle.toLowerCase().includes(key.toLowerCase()))
    }else{
      this.recupererLesDispositifsMedicaux()
      this.recupererLesMedicaments()
    }
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

  //Commander un produit
  commanderLeProduit(produit: any){

  }

}
