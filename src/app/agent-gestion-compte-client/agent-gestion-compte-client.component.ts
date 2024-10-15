
import { Component, OnInit } from '@angular/core';
import { ProfilService } from '../services/comptes/profil.service';
import { Client } from '../model/Client';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-agent-gestion-compte-client',
  templateUrl: './agent-gestion-compte-client.component.html',
  styleUrl: './agent-gestion-compte-client.component.css'
})
export class AgentGestionCompteClientComponent implements OnInit{
  protected readonly JSON = JSON;

  public lesClients: Array<Client> = [];
  public lesClientsOperationnels: Array<Client> = [];
  public lesClientsNonOperationnels: Array<Client> = [];

  public researchAndFiltreForm! : FormGroup;

  public constructor(
    private profileService: ProfilService,
    private formBuilder: FormBuilder
  ){}




  ngOnInit(): void {
      this.getLesClients();
      this.researchAndFiltreForm = this.createResearchAndFilterFormular();
  }

  //Formulaire pour créer un filtre  pour avoir les comptes opérationnels et non opérationnels 
  createResearchAndFilterFormular(){
    return this.formBuilder.group({
      operationnel : this.formBuilder.control(null),
      nonOperationnel: this.formBuilder.control(null),
      search: this.formBuilder.control('')
    })
  }


  //Récupération de tous les clients
  getLesClients(){
    this.profileService.getClientProfil().subscribe({
      next: (clients)=>{
        this.lesClients=clients;
        this.getLesClientsOperationnels();
        this.getLesClientsNonOperationnels();
      },
      error: err=> console.log("Erreur de chargement ")
    })
  }


  //Récupération des clients opérationnels
  getLesClientsOperationnels(){
    this.lesClientsOperationnels = [];
    this.lesClients.forEach((client)=>{
      if( !client.isActive){
        this.lesClientsOperationnels.push(client);
      }
    })
  }


  //Récupération des clients non opérationnels
  getLesClientsNonOperationnels(){
    this.lesClientsNonOperationnels = [];
    this.lesClients.forEach((client)=>{
      if( client.isActive){
        this.lesClientsNonOperationnels.push(client);
      }
    })
  }


  //Récupération des clients opérationnels
  recupereLesClientsOperationnels(){
    this.lesClients = this.lesClientsOperationnels;
  }


  //Récupération des clients non opérationnels
  recupereLesClientsNonOperationnels(){
    this.lesClients = this.lesClientsNonOperationnels;
  }


  //Passer du filtre sur les clients
  recupererLesClients(){
    let filtre = this.researchAndFiltreForm.value;
    if(filtre.operationnel && filtre.nonOperationnel){
        this.getLesClients();
    }else if(!filtre.operationnel && filtre.nonOperationnel){
      this.recupereLesClientsNonOperationnels();
    }else if(filtre.operationnel && !filtre.nonOperationnel){
      this.recupereLesClientsOperationnels();
    }else{
      this.getLesClients();
    }
  }


  //Valider l'inscription d'un client
  validateClientRegistration(client: Client){
      if(confirm("Voulez-vous activer le compte?")){
        client.isActive = !client.isActive
        this.profileService.updateClientProfil(client).subscribe({
          next: client => { 
            this.recupererLesClients()
            this.getLesClientsNonOperationnels()
            this.getLesClientsOperationnels()
            alert("Compte activé avec succès")
          
          },
          error: err => console.log("Erreur de modification")
        })
      }
  }


  //Désactiver le compte d'un client
  desactivateClientAccount(client: Client){
      if(confirm("Êtes vous certain de désactiver le compte du client?")){
        client.isActive =  !client.isActive
        this.profileService.updateClientProfil(client).subscribe({
          next: client=>{ 
            this.recupererLesClients()
            this.getLesClientsNonOperationnels()
            this.getLesClientsOperationnels()
            alert("Compte Désactivé avec succès")
           
          },
          error: err => console.log("Erreur de la désactivation du compte")
        })
      }
  }

  researchClients() {
    let formular = this.researchAndFiltreForm.value;
    let researchKey = formular.search.toLowerCase(); // Convert search key to lowercase for case-insensitive search
    let currentClientsShowList: Array<Client> = [];

    if(researchKey){
      this.lesClients.forEach((client) => {
        // Assuming you are searching by client name or another field
        if (client.nomEntreprise.toLowerCase().includes(researchKey) || 
            client.numeroAccreditation.toLowerCase().includes(researchKey) || 
            client.id.toString().includes(researchKey)) {
            currentClientsShowList.push(client);
        }
      });

      // Optionally update the client list to show only the results
      this.lesClients = currentClientsShowList;
    }else{
      this.recupererLesClients();
    }
    
}


   
}
