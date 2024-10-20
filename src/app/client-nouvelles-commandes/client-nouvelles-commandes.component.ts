import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/comptes/auth.service';
import { FormBuilder } from '@angular/forms';
import { Client } from '../model/Client';
import { Commande } from '../model/commande';
import { CommandeService } from '../services/commandes/commande.service';
import { ProfilService } from '../services/comptes/profil.service';

@Component({
  selector: 'app-client-nouvelles-commandes',
  templateUrl: './client-nouvelles-commandes.component.html',
  styleUrl: './client-nouvelles-commandes.component.css'
})
export class ClientNouvellesCommandesComponent implements OnInit{

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
    for (let i = 0; i < this.lesCommandes.length; i += 3) {
      groupes.push(this.lesCommandes.slice(i, i + 3));
    }
    return groupes;
  }

  //Recupérer les commandes d'un client
  recupererLesCommandesDuClient(){
    this.commandeService.recupererLesCommandes().subscribe({
      next: commandes=>{
        this.lesCommandesInitiaux = commandes.filter(com=>  com.client.id === this.ID.id )
        this.lesCommandes = this.lesCommandesInitiaux.filter(com=>com.etatCommande === "CONFIRME") 
      },
      error: err=> console.log("Erreur de chargement des commandes")
    })
  }

  //afficher les détails d'une commande
  voirDetails(commande: Commande){

  }

  //Annuler une commande
  annulerCommande(commande: Commande){
      if(confirm("Confirmer l'annulation de la commande N°: "+commande.id)){
        commande.etatCommande = "ANNULEE"
        this.commandeService.changeEtatCommande(commande).subscribe({
            next: commande=> this.recupererLesCommandesDuClient(),
            error: err=> console.log("Erreur de changement d'état de la commande")
        })
      }
  }

  //Filtrer les commandes
  filtrerCommandes(etat: string) {
    // Logique pour filtrer les commandes en fonction de l'état sélectionné
    if (etat === 'CONFIRMEE') {
      this.lesCommandes = this.lesCommandesInitiaux.filter(commande => commande.etatCommande === 'CONFIRMEE')
    } else if (etat === 'EN_ATTENTE') {
      this.lesCommandes = this.lesCommandesInitiaux.filter(commande => commande.etatCommande === 'EN_ATTENTE');
    }
     else if (etat === 'EN_COURS') {
      this.lesCommandes = this.lesCommandesInitiaux.filter(commande => commande.etatCommande === 'EN_COURS');
    }
  }

  //Passer une réclamation sur une commande donnée
  passerUneReclamation(commande : Commande){

  }
}
