import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LignePanier } from '../model/LignePanier';
import { Panier } from '../model/Panier';
import { PanierService } from '../services/paniers/panier.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/comptes/auth.service';
import { ProfilService } from '../services/comptes/profil.service';
import { Client } from '../model/Client';

@Component({
  selector: 'app-client-panier',
  templateUrl: './client-panier.component.html',
  styleUrl: './client-panier.component.css'
})
export class ClientPanierComponent implements OnInit{

  lignesPanier= [
    {
      produit: { nom: 'Paracétamol', prix: 1000 },
      quantite: 2
    },
    {
      produit: { nom: 'Vitamine C', prix: 500 },
      quantite: 5
    },
    {
      produit: { nom: 'Antibiotique', prix: 2500 },
      quantite: 1
    }
    ,
    {
      produit: { nom: 'Vitamine C', prix: 500 },
      quantite: 5
    },
    {
      produit: { nom: 'Antibiotique', prix: 2500 },
      quantite: 1
    }
    ,
    {
      produit: { nom: 'Vitamine C', prix: 500 },
      quantite: 5
    },
    {
      produit: { nom: 'Antibiotique', prix: 2500 },
      quantite: 1
    }
  ];



  lesLignesPaniers : LignePanier[] =[]
  estVisibleLeFormulaireDajout = false
  ligneCourant : any;
  panierClient!: Panier;
  formulaireModificationLignePanier! : FormGroup
  client! : Client
  date =  new Date()
  


  constructor(
    private authService: AuthService,
    private panierService: PanierService,
    private profilService: ProfilService,
    private toastr: ToastrService,
    private fb : FormBuilder
  ){}


  ngOnInit(): void {
      let ID = this.authService.getCompteID()
      if(ID){
          this.recupererLeCompteClient(ID.id)
      }else{
        this.authService.logout()
      }
    
  }

  //recuperer le compte client
  recupererLeCompteClient(id : string){
    this.profilService.recupererUnCompteClient(id).subscribe({
      next: value=>{
          this.client = value
          this.recupererLePanierClient(this.client)
      },
      error : err=> console.log("Erreur de récupération du compte client")
    })
  }


  //recupération du panier client
  recupererLePanierClient(client: Client){
    this.panierService.getPanier(client).subscribe({
      next: panier=>{
        this.panierClient = panier
      },
      error: err=> console.log("Erreur de récupération du panier client")
    })
  }
 
  //Valider le panier
  validerPanier(){

  }

  //Vider le panier
  viderPanier() {
    
  }


  //Supprimer une ligne panier
  supprimerLigne(ligne: any){
    if(confirm("Confirmez vous le retrait de ce produit du panier")){
      this.lignesPanier = this.lignesPanier.filter(l=> ligne !== l)
      this.toastr.success(`${ligne.produit.nom} a été supprimer avec succès!`, "Confirmation du retrait")
    }
  }


  //Modifier la quantite d'une ligne commande
  ModifierLaQuantite(ligne : any){
    this.estVisibleLeFormulaireDajout = true
    this.ligneCourant = ligne
    this.formulaireModificationLignePanier = this.creerLeFormulaireDeModification()
    this.formulaireModificationLignePanier.patchValue({quantite: ligne.quantite})
  }

  //creer un formulaire de modification de la quantité de la ligne
  creerLeFormulaireDeModification(){
    return this.fb.group({
      quantite : this.fb.control(0, [Validators.required, Validators.min(1)])
    })
  }

  //Valider la modification de la quantité de la ligne commande
  validerQuantite(){

  }
}
