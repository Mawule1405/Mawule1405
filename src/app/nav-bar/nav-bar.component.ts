import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']  // Corrigé : styleUrls au lieu de styleUrl
})
export class NavBarComponent implements OnInit {
  public actions = [
    { title: "Accueil", router: "/home" },
    { title: "A propos", router: "/about" },
    { title: "Contact", router: "/contact" },
    { title: "Se connecter", router: "/login" }
  ];

  public currentAction: any;

  constructor(private router: Router) {}

  ngOnInit(): void {

   
    this.routeActionListener();

    this.startWithActiveCurrentRoute();
    
  }

  routeActionListener(){
    this.router.events.subscribe(event=>{
        if(event instanceof NavigationEnd){
          this.currentAction = this.actions.find(action=> action.router === event.url);
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
