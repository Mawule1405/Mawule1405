import { Component, OnInit } from '@angular/core';
import { Commande } from '../model/commande';
import { CommandeService } from '../services/commandes/commande.service';
import { LigneCommande } from '../model/LigneCommande';

@Component({
  selector: 'app-agent-gestion-commandes',
  templateUrl: './agent-gestion-commandes.component.html',
  styleUrl: './agent-gestion-commandes.component.css'
})
export class AgentGestionCommandesComponent implements OnInit{

  allButtonsElements = [
    {index : 0, title: "Nouvelles commandes", icon : ""},
    {index : 1, title: "Commandes en cours de traitement", icon : ""},
    {index : 2, title: "Commandes  traitées", icon : ""},
    {index : 3, title: "Commandes  livrées", icon : ""},
    {index : 4, title: "Commandes  annulées", icon : ""},

  ];

  boutonCourant = {index : 0, title: "Nouvelles commandes", icon : ""};

  lesCommandes : Array<Commande> = [];
  afficherLesDetailsCommande = false;
  commandeCourante! : Commande;
  lesLignesCommandes: Array<LigneCommande> = [];

  constructor(
    private commandeService: CommandeService
  ){

  }

  ngOnInit(){
    this.boutonCourant = this.allButtonsElements[0];
    this.getCommandesEnAttentes()
  }


  changeLesElementsAffiches(btn: any) {
      this.boutonCourant = this.allButtonsElements[btn.index]
      if(btn.index==0){
        this.getCommandesEnAttentes();
      }
      else if(btn.index == 1){
        this.getCommandesEnCours();
      }
      else if(btn.index == 2){
        this.getCommandesTraitees();
      }
      else if(btn.index == 3){
        this.getCommandesLivrees();
      }
      else if(btn.index == 4){
        this.getCommandesAnnulees();
      }
  }

  researchProducts(){
  }

  getCommandesEnAttentes(){
    this.commandeService.getCommandesEnAttente().subscribe({
      next: values => this.lesCommandes = values,
      error: err=> console.log("Erreur de chargement des commandes en attentes")
    })
  }
  getCommandesEnCours(){
    this.commandeService.getCommandesEnCours().subscribe({
      next: values => this.lesCommandes = values,
      error: err=> console.log("Erreur de chargement des commandes en attentes")
    })
  }

  getCommandesTraitees(){
    this.commandeService.getCommandesTraitees().subscribe({
      next: values => this.lesCommandes = values,
      error: err=> console.log("Erreur de chargement des commandes en attentes")
    })
  }

  getCommandesLivrees(){
    this.commandeService.getCommandesLivree().subscribe({
      next: values => this.lesCommandes = values,
      error: err=> console.log("Erreur de chargement des commandes en attentes")
    })
  }

  getCommandesAnnulees(){
    this.commandeService.getCommandesAnnulees().subscribe({
      next: values => this.lesCommandes = values,
      error: err=> console.log("Erreur de chargement des commandes en attentes")
    })
  }

  voirDetailsCommande(order : Commande){
      this.commandeCourante = order;
      this.afficherLesDetailsCommande = true
      this.commandeService.getLigneCommandes(order).subscribe({
        next: (ligneCommandes)=>{
          this.lesLignesCommandes = ligneCommandes;
        },
        error : err=> console.log("Erreur de chargement")
      })
      
  }
  closeModalButton(){
    this.afficherLesDetailsCommande = false
  }

  accepterCommande(order: Commande){
    if(this.boutonCourant.index==0){
      if(confirm("Confirmer vous avoir reçu cette commande")){
        order.etatCommande = "EN_COURS"
        this.commandeService.updateCommande(order).subscribe({
          next : value => this.getCommandesEnAttentes(),
          error: err=> console.log("Erreur dans le procédure d'acceptation de la commande")
        })
      }
    }else if(this.boutonCourant.index==1){
      if(confirm("Confirmer vous que la commande a été traité?")){
        order.etatCommande = "TRAITEE"
        this.commandeService.updateCommande(order).subscribe({
          next : value => this.getCommandesEnCours(),
          error: err=> console.log("Erreur dans le procédure d'acceptation de la commande")
        })
      }
    }

    else if(this.boutonCourant.index==2){
      if(confirm("Confirmer vous que la commande est déjà traitée?")){
        order.etatCommande = "LIVREE"
        this.commandeService.updateCommande(order).subscribe({
          next : value => this.getCommandesEnCours(),
          error: err=> console.log("Erreur dans le procédure d'acceptation de la commande")
        })
      }
    }

    else if(this.boutonCourant.index==3){
      if(confirm("Confirmer vous que la commande est près à être livrée?")){
        order.etatCommande = "EN_LIVRAISON"
        this.commandeService.updateCommande(order).subscribe({
          next : value => this.getCommandesEnCours(),
          error: err=> console.log("Erreur dans le procédure d'acceptation de la commande")
        })
      }
    }

  }


}
