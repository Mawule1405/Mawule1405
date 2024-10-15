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

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private commandeService: CommandeService,
    private profilService: ProfilService
  ){

  }

  ngOnInit(): void {
    const ID = this.authService.getCompteID();

    if(ID){
      
      this.recupererLesInformationsDuClients(ID.id)
      
      
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
    for (let i = 0; i < this.lesCommandes.length; i += 2) {
      groupes.push(this.lesCommandes.slice(i, i + 2));
    }
    return groupes;
  }

  //Recupérer les commandes d'un client
  recupererLesCommandesDuClient(){
    this.commandeService.recupererLesCommandes().subscribe({
      next: commandes=>{
        this.lesCommandes = commandes.filter(com=> com.etatCommande !== "EN_COURS" &&  com.etatCommande !=="EN_ATTENTE" && com.client.id === this.client.id)
      },
      error: err=> console.log("Erreur de chargement des commandes")
    })
  }

  //afficher les détails d'une commande
  voirDetails(commande: Commande){

  }

  //Annuler une commande
  annulerCommande(commande: Commande){

  }

  filtrerCommandes(etat: string) {
    // Logique pour filtrer les commandes en fonction de l'état sélectionné
    if (etat === 'EN_ATTENTE') {
      this.lesCommandes = this.lesCommandes.filter(commande => commande.etatCommande === 'EN_ATTENTE');
    } else if (etat === 'EN_COURS') {
      this.lesCommandes = this.lesCommandes.filter(commande => commande.etatCommande === 'EN_COURS');
    }
  }
}
