import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/comptes/auth.service';
import { Router } from '@angular/router';

import { Client } from '../model/Client';
import { PanierService } from '../services/paniers/panier.service';
import { Panier } from '../model/Panier';
import { LignePanier } from '../model/LignePanier';
import { ProfilService } from '../services/comptes/profil.service';

@Component({
  selector: 'app-client-nav-bar',
  templateUrl: './client-nav-bar.component.html',
  styleUrl: './client-nav-bar.component.css'
})
export class ClientNavBarComponent implements OnInit {
  lesActions = [
    {index:0, title:"Catalogues", router:"/client/catalogues/tous-les-produits"},
    {index:1, title:"Tous les produits", router:"/client/catalogues/tous-les-produits"},
    {index:2, title:"Médicaments", router:"/client/catalogues/medicaments"},
    {index:3, title:"Dispositifs Médicaux", router:"/client/catalogues/dispositifs-medicaux"},
    {index:4, title:"Commandes", router:"/client/commandes/nouvelles-commandes"},
    {index:5, title:"Nouvelles commandes", router:"/client/commandes/nouvelles-commandes"},
    {index:6, title:"Anciennes commandes", router:"/client/commandes/anciennes-commandes"},
    {index:7, title:"Reclamations", router:"/client/commandes/nouvelles-reclamations"},
    {index:8, title:"Nouvelles reclamations", router:"/client/commandes/nouvelles-reclamations"},
    {index:9, title:"Anciennes reclamations", router:"/client/commandes/anciennes-reclamations"},

  ]
   compte! : Client;
   panierClient! : Panier;
  
   

  
  constructor(private authService: AuthService,
              private panierService: PanierService,
              private profilService: ProfilService,
              private router: Router
              ){}

  ngOnInit(): void {
    const ID = this.authService.getCompteID()
    if (ID) {
      this.recupererLesInformationsDuClients(ID.id);
     
      
      
    } else {
      //this.deconnexion()
    }
  }

  deconnexion(){
    this.authService.logout();
    
  }

  //recuperer les informations du clients
  recupererLesInformationsDuClients(id : string){
    this.profilService.recupererUnCompteClient(id).subscribe({
      next: value=>{
        this.compte = value
        //this.getPanierClient(this.compte)
        
      },
      error: err=> console.log("Erreur de récupération du compte client")
    })
  }


  //Recupérer le panier du client
  getPanierClient(client : Client){
    this.panierService.trouverPanier(client)
      let valeurStocker = this.panierService.getPanierDuStock()
      if(valeurStocker){
        this.panierClient = valeurStocker
      
      }else{
        
      }
  }

  //Accéder à l'interface de présentation du panier du client
  voirPanier(){
    this.router.navigate(['/client/panier/detail'])
  }

}
