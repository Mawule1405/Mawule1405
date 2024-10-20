import { Component, OnInit } from '@angular/core';
import { Client } from '../model/Client';
import { Commande } from '../model/commande';
import { AuthService } from '../services/comptes/auth.service';
import { FormBuilder } from '@angular/forms';
import { CommandeService } from '../services/commandes/commande.service';
import { ProfilService } from '../services/comptes/profil.service';

@Component({
  selector: 'app-client-anciennes-commandes',
  templateUrl: './client-anciennes-commandes.component.html',
  styleUrl: './client-anciennes-commandes.component.css'
})
export class ClientAnciennesCommandesComponent implements OnInit {

  client!: Client
  lesCommandes : Commande[] = []
  lesCommandesInitiaux : Commande[] = []
  ID : any;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private commandeService: CommandeService,
    private profilService: ProfilService
  ){

  }

  ngOnInit(): void {
    this.ID = this.authService.getCompteID();

    if(this.ID){
      
      this.recupererLesInformationsDuClients(this.ID.id)
      
      
    }else{
     
      this.authService.logout()
    }
  }
  

   //recuperer les informations du clients
   recupererLesInformationsDuClients(id : string){
    this.profilService.recupererUnCompteClient(id).subscribe({
      next: value=>{
        this.client = value
        this.recupererLesCommandesDuClient()
       
      },
      error: err=> console.log("Erreur de récupération du compte client")
    })
  }

  //Obtenir les commandes deux à deux
  getCommandesParPaire() {
    const groupes = [];
    for (let i = 0; i < this.lesCommandes.length; i += 4) {
      groupes.push(this.lesCommandes.slice(i, i + 4));
    }
    return groupes;
  }

  //Recupérer les commandes d'un client
  recupererLesCommandesDuClient(){
    this.commandeService.recupererLesCommandes().subscribe({
      next: commandes=>{
        this.lesCommandesInitiaux = commandes.filter(com=> com.client.id === this.ID.id )
        this.lesCommandes = this.lesCommandesInitiaux.filter(com=> com.etatCommande === "TRAITEE")
      },
      error: err=> console.log("Erreur de chargement des commandes")
    }) ; 
  }

  //afficher les détails d'une commande
  voirDetails(commande: Commande){

  }

  //Annuler une commande
  annulerCommande(commande: Commande){

    commande.etatCommande = "ANNULEE"
    if(confirm("Souhaitez-vous annulés cette commande?")){
      this.commandeService.changeEtatCommande(commande).subscribe({
        next: commandes=>{
          this.recupererLesCommandesDuClient()
            this.filtrerCommandes("ANNULEE")
        },
        error: err=> console.log("Erreur de modification")
      })
    }

  }

  //Relancer une commande
  relancerLaCommande(commande : Commande){
    commande.etatCommande = "EN_COURS"
    if(confirm("Souhaitez-vous annulés cette commande?")){
      this.commandeService.changeEtatCommande(commande).subscribe({
        next: commandes=>{
            this.recupererLesCommandesDuClient()
            this.filtrerCommandes("ANNULLEE")
        },
        error: err=> console.log("Erreur de modification")
      })
    }
  }

  filtrerCommandes(etat: string) {
    // Logique pour filtrer les commandes en fonction de l'état sélectionné
    if (etat === 'ANNULEE') {
      this.lesCommandes = this.lesCommandesInitiaux.filter(commande => commande.etatCommande === 'ANNULEE' && commande.client.id === this.ID.id );
    } else if (etat === 'TRAITEE') {
      this.lesCommandes = this.lesCommandesInitiaux.filter(commande => commande.etatCommande === 'TRAITEE' && commande.client.id === this.ID.id );
    }
  }
}
