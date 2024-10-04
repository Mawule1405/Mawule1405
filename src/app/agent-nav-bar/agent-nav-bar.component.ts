import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-agent-nav-bar',
  templateUrl: './agent-nav-bar.component.html',
  styleUrl: './agent-nav-bar.component.css'
})
export class AgentNavBarComponent implements OnInit{

  isSidebarVisible = false;

  public actions= [
    { icon: 'bi bi-box-seam', text: 'Catalogues de produits', router:"/agent/catalogue"},
    { icon: 'bi bi-boxes', text: 'Gestion de stock', router:"/agent/gestion-stocks" },
    {icon: 'bi bi-people', text: 'Gestion des comptes', router: "/agent/comptes"},
    {icon: 'bi bi-plus-circle', text: 'Gestion des commandes', router: "/agent/gestion-commandes"},
    { icon: 'bi bi-chat-left-text', text: 'Gestion des réclamations', router:"/agent/gestion-reclamations" },
    { icon: 'bi bi-truck', text: 'Gestion des livraisons', router:"/agent/gestion-livraisons" },
    { icon: 'bi bi-file-earmark-text', text: 'Gestion des documents', router:"/agent" },
    { icon: 'bi bi-speedometer2', text: 'Tableau de bord', router:"/agent" },
    { icon: 'bi bi-gear', text: 'Paramètres', router:"/agent" },
    { icon: 'bi bi-box-arrow-right', text: 'Déconnecter', router:"/home" }

  ];



  public currentAction: any;


  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  constructor(private router: Router) {}

  ngOnInit(): void {


    this.routeActionListener();

    this.startWithActiveCurrentRoute();

  }

  routeActionListener(){
    this.router.events.subscribe(event=>{
        if(event instanceof NavigationEnd){
          this.currentAction = this.actions.find(action=>{
             action.router === event.url || (action.router === "/comptes" && (event.url==="/comptesClients" || event.url==="/comptesAgents"))
            });
        }
    })
  }

  startWithActiveCurrentRoute(){
    this.currentAction = this.actions.find(action => action.router === this.router.url);
  }

  changeAction(action: any) {
    this.currentAction = action;
  }


}
