import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 

  listOfService = [
    {title: "Vente des médicaments", image: "assets/images/img_1.png", description: ""},
    {title: "", image: "assets/images/img_2.png", description: ""},
    {title: "", image: "assets/images/img_3.png", description: ""},
    {title: "", image: "assets/images/img.png", description: ""},
    {title: "", image: "assets/images/img_1.png", description: ""},
  ];

  currentAction={
    title:"Accueil", router:"/home"
  };

 
  


  


}
