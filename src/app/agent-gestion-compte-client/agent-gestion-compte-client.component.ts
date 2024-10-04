
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

  createResearchAndFilterFormular(){
    return this.formBuilder.group({
      operationnel : this.formBuilder.control(null),
      nonOperationnel: this.formBuilder.control(null),
      search: this.formBuilder.control('')
    })
  }

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

  getLesClientsOperationnels(){
    this.lesClientsOperationnels = [];
    this.lesClients.forEach((client)=>{
      if( client.estOperationnel){
        this.lesClientsOperationnels.push(client);
      }
    })
  }

  getLesClientsNonOperationnels(){
    this.lesClientsNonOperationnels = [];
    this.lesClients.forEach((client)=>{
      if( !client.estOperationnel){
        this.lesClientsNonOperationnels.push(client);
      }
    })
  }

  recupereLesClientsOperationnels(){
    this.lesClients = this.lesClientsOperationnels;
  }

  recupereLesClientsNonOperationnels(){
    this.lesClients = this.lesClientsNonOperationnels;
  }

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

  validateClientRegistration(client: Client){
      if(confirm("Validez-vous les informations du clients?")){
        this.profileService.updateClientProfil(client).subscribe({
          next: client=>{
            this.recupererLesClients();
          }
        })
      }
  }

  desactivateClientAccount(client: Client){
      if(confirm("Êtes vous certain de désactiver le compte du client?")){
        this.profileService.updateClientProfil(client).subscribe({
          next: client=>{
            this.recupererLesClients();
          }
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
        if (client.nomStructure.toLowerCase().includes(researchKey) || 
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
