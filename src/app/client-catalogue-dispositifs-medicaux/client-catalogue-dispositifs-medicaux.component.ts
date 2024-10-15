import { Component, OnInit } from '@angular/core';
import { DispositifMedical } from '../model/DispositifMedical';
import { ProductService } from '../services/catalogue/product.service';
import { AuthService } from '../services/comptes/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Panier } from '../model/Panier';
import { ProfilService } from '../services/comptes/profil.service';
import { Client } from '../model/Client';

@Component({
  selector: 'app-client-catalogue-dispositifs-medicaux',
  templateUrl: './client-catalogue-dispositifs-medicaux.component.html',
  styleUrl: './client-catalogue-dispositifs-medicaux.component.css'
})
export class ClientCatalogueDispositifsMedicauxComponent implements OnInit{

  lesDispositifsMedicaux: DispositifMedical[] = []
  estVisibleLefFormulaireDajout = false
  panierClient! :Panier 
  produitAjouter : any
  formulaireAjoutAuPanier! : FormGroup

  compte! : Client


  constructor(
    private produitService: ProductService,
    private authService: AuthService,
    private fb: FormBuilder,
    private  profilService: ProfilService
  ){}
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

   //recuperer les informations du clients
   recupererLesInformationsDuClients(id : string){
    this.profilService.recupererUnCompteClient(id).subscribe({
      next: value=>{
        this.compte = value
        this.recupererLesDispositifsMedicaux()
        this.getPanierClient()
       
      },
      error: err=> console.log("Erreur de récupération du compte client")
    })
  }

  //recuperer le panier du client
  getPanierClient(){
     
  }


  //recuperer les dispositifs medicaux
  recupererLesDispositifsMedicaux(){
      this.produitService.recupererTousLesDispositifsMedicaux().subscribe({
        next : values=> this.lesDispositifsMedicaux = values,
        error: err=> console.log("Erreur de récupération des dispositifs médicaux")
      })
  }

  //Ajouter un produit au panier
  ajouterAuPanier(produit: DispositifMedical){
    this.estVisibleLefFormulaireDajout = true
    this.produitAjouter = produit
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

  //Fermer le formulaire d'ajout d'un produit au panier
  fermerFormulaireDajout(){
    this.estVisibleLefFormulaireDajout = false
    this.formulaireAjoutAuPanier.reset()
}
}
