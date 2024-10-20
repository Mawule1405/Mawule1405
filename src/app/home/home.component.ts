import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
 

  tousLesServices = [
    { 
      title: "Vente des médicaments", 
      image: "../../assets/images/img_1.png", 
      description: "Nous offrons une large gamme de médicaments disponibles pour répondre à vos besoins de santé." 
    },
    { 
      title: "Livraison à domicile", 
      image: "../../assets/images/img_3.png", 
      description: "Profitez de notre service de livraison à domicile pour recevoir vos médicaments rapidement et en toute sécurité." 
    },
    { 
      title: "Conseil pharmaceutique", 
      image: "../../assets/images/img.png", 
      description: "Nos experts vous offrent des conseils sur l'utilisation correcte de vos médicaments et leurs effets secondaires." 
    },
    { 
      title: "Produits de bien-être", 
      image: "../../assets/images/img_1.png", 
      description: "Découvrez notre sélection de produits de bien-être pour améliorer votre qualité de vie." 
    }
  ];
  

  currentAction={
    title:"Accueil", router:"/home"
  };
  currentIndex: number = 0;
  servicesParPage: number = 3;
  listOfServices = [...this.tousLesServices.slice(this.currentIndex, this.currentIndex + this.servicesParPage)];
  intervalId: any;
  isAnimating = false;
  
  ngOnInit() {
    this.startAutoScroll();
  }
  
  startAutoScroll() {
    this.intervalId = setInterval(() => {
      this.isAnimating = true; // Active l'animation avant de changer le service
      setTimeout(() => {
        this.trioDeServicesSuivants();
        this.isAnimating = false; // Désactive l'animation après la transition
      }, 500); // Durée de l'animation (0.5s)
    }, 10000); // 20 secondes
  }

  
  trioDeServicesPrecedents() {
    if (this.currentIndex > 0) {
      this.currentIndex -= 1
      //this.servicesParPage;
      this.listOfServices = [...this.tousLesServices.slice(this.currentIndex, this.currentIndex + this.servicesParPage)];
    }
  }
  
  trioDeServicesSuivants() {
    if (this.currentIndex + this.servicesParPage < this.tousLesServices.length) {
      this.currentIndex += 1
      //this.servicesParPage;
      this.listOfServices = [...this.tousLesServices.slice(this.currentIndex, this.currentIndex + this.servicesParPage)];
    } else {
      // Revenir au début si on atteint la fin de la liste
      this.currentIndex = 0;
      this.listOfServices = [...this.tousLesServices.slice(this.currentIndex, this.currentIndex + this.servicesParPage)];
    }
  }
  
  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId); // Arrête le défilement automatique lorsque le composant est détruit
    }
  }
  
  
  


}
