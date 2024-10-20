import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-anciennes-reclamations',
  templateUrl: './client-anciennes-reclamations.component.html',
  styleUrl: './client-anciennes-reclamations.component.css'
})
export class ClientAnciennesReclamationsComponent implements OnInit {


  listeReclamations = [
    {
      id: "REC001",
      descriptionReclamation: "Problème avec la qualité du produit.",
      dateReclamation: new Date("2024-10-01"),
      etatReclamation: "EN_COURS",
      commande: {
        id: "CMD001",
        nomProduit: "Paracétamol 500mg",
      }
    },
    {
      id: "REC002",
      descriptionReclamation: "Délai de livraison non respecté.",
      dateReclamation: new Date("2024-09-20"),
      etatReclamation: "TRAITÉE",
      commande: {
        id: "CMD002",
        nomProduit: "Ibuprofène 200mg",
      }
    },
    {
      id: "REC003",
      descriptionReclamation: "Erreur sur la quantité commandée.",
      dateReclamation: new Date("2024-10-05"),
      etatReclamation: "REJETÉE",
      commande: {
        id: "CMD003",
        nomProduit: "Vitamine C 1000mg",
      }
    },
    {
      id: "REC004",
      descriptionReclamation: "Produit endommagé à la réception.",
      dateReclamation: new Date("2024-10-11"),
      etatReclamation: "EN_COURS",
      commande: {
        id: "CMD004",
        nomProduit: "Gel antibactérien 100ml",
      }
    },
    {
      id: "REC005",
      descriptionReclamation: "Erreur de facturation.",
      dateReclamation: new Date("2024-09-30"),
      etatReclamation: "TRAITÉE",
      commande: {
        id: "CMD005",
        nomProduit: "Sérum physiologique 10ml",
      }
    }
  ];

  ngOnInit(){
    
  }

  voirDetailsCommande(commande : any){

  }

  annulerReclamation(reclamation : any){

  }

}
