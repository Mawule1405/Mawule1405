import { Component, OnInit } from '@angular/core';
import { ReclamationService } from '../services/reclamations/reclamation.service';
import { Reclamation } from '../model/Reclamation';

@Component({
  selector: 'app-agent-gestion-reclamations',
  templateUrl: './agent-gestion-reclamations.component.html',
  styleUrl: './agent-gestion-reclamations.component.css'
})
export class AgentGestionReclamationsComponent implements OnInit{

  lesActions : Array<any>= [
    {index:0, title: "Nouvelles réclamations" },
    {index:1, title: "Réclamations Lues"},
    {index:2, title: "Réclamations traitées"}
  ]

  lesReclamations : Array<Reclamation> =[]
  headTableReclammations = ["id", "Date", "Etat", "Réclamation", "Description","Preuve", "Vu", "Répondre"]
  boutonCourant: any

  constructor(private reclamationService: ReclamationService){}


  ngOnInit(){
    this.boutonCourant = this.lesActions[0]
    this.getReclamationsNouvelles()
  }


  getReclamationsNouvelles(){
    this.reclamationService.getReclamationsNouvelles().subscribe({
      next: (reclamations)=>{
        this.lesReclamations = reclamations
      },
      error: (err)=> console.log("Erreur de chargement des réclamations")
    })
  }
  getReclamationsLues(){
    this.reclamationService.getReclamationsLues().subscribe({
      next: (reclamations)=>{
        this.lesReclamations = reclamations
      },
      error: (err)=> console.log("Erreur de chargement des réclamations")
    })
  }

  getReclamationsArchivees(){
    this.reclamationService.getReclamationsArchivees().subscribe({
      next: (reclamations)=>{
        this.lesReclamations = reclamations
      },
      error: (err)=> console.log("Erreur de chargement des réclamations")
    })
  }

  declarerTraiter(recl : Reclamation){
    if(confirm("Etes vous certain de vouloir déclarer cette réclamation traitée?")){
      recl.etatReclamation = "ARCHIVE"
      this.reclamationService.update(recl).subscribe({
        next: value=>{
          this.getReclamationsNouvelles()  
        },
        error : err=>console.log("Erreur de modification")
      })
    }
  }

  declarerLu(recl: Reclamation){
    recl.etatReclamation = "LU"
    this.reclamationService.update(recl).subscribe({
      next: value=>{
        this.getReclamationsNouvelles()
      },
      error : err=>console.log("Erreur de modification")
    })
  }

  researchReclamationsNouvelles(){

  }

  changeLesElementsAffiches(btn: any){
    this.boutonCourant = btn;
    if(btn.index == 0){
      this.getReclamationsNouvelles()
    }else if(btn.index == 1){
      this.getReclamationsLues()
    }else if(btn.index == 2){
      this.getReclamationsArchivees()
    }
  }
}
