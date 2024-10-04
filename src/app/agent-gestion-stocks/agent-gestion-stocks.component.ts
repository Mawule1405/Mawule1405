import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Medicament} from "../model/Medicament";
import {ProductService} from "../services/catalogue/product.service";
import {MouvementStockService} from "../services/catalogue/mouvement-stock.service";
import {MouvementStock} from "../model/MouvementStock";

@Component({
  selector: 'app-agent-gestion-stocks',
  templateUrl: './agent-gestion-stocks.component.html',
  styleUrl: './agent-gestion-stocks.component.css'
})
export class AgentGestionStocksComponent implements OnInit{

  optionMouvementRecent = [5, 10, 20 , 30, 50, 100, 500, "tous"]
  months = [
    { name: 'Janvier', value: 1 },
    { name: 'Février', value: 2 },
    { name: 'Mars', value: 3 },
    { name: 'Avril', value: 4 },
    { name: 'Mai', value: 5 },
    { name: 'Juin', value: 6 },
    { name: 'Juillet', value: 7 },
    { name: 'Août', value: 8 },
    { name: 'Septembre', value: 9 },
    { name: 'Octobre', value: 10 },
    { name: 'Novembre', value: 11 },
    { name: 'Décembre', value: 12 },
  ];

  years: number[] = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);


  researchMedicamentsFormular!: FormGroup;
  lesMedicaments: Array<Medicament>= [];
  lesMouvementsStock: Array<MouvementStock> = []

  allButtonsElements: Array<any>=[
    {index : 1, title : "les médicaments retirés", icon:"bi_car"},
    {index : 2, title : "les approvisionnements", icon:"bi_car"}
  ];

  affichageCourant! :any ;

  //Les éléments du filtres
  formulaireFiltre! : FormGroup;


  constructor(private productService: ProductService,
              private mouvementService: MouvementStockService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.getAllMedicament();

    this.affichageCourant = this.allButtonsElements[0];
    this.formulaireFiltre = this.createFiltreFormular();
    this.researchMedicamentsFormular = this.createFormulaireDeRechercheDansCatalogue();
  }

  createFiltreFormular(){
    return this.formBuilder.group({
      valeurDeRecherche : this.formBuilder.control(""),
      leMoisDeFiltre : this.formBuilder.control( new Date().getMonth()+1),
      lanneeDeFiltre : this.formBuilder.control(new Date().getFullYear()),
      nombreRecent : this.formBuilder.control("tous")
    })
  }

  createFormulaireDeRechercheDansCatalogue(){
    return this.formBuilder.group({
      cle : this.formBuilder.control("")
    })
  }

  researchMouvements() {

    //Formule de recherche sur les médicaments retirés du catalogues
    let cle = this.researchMedicamentsFormular.value.cle
    console.log(cle)
    this.productService.getTousLesMedicaments().subscribe({
      next: (medocs) => {
        this.lesMedicaments = medocs.filter(medoc=>
          medoc.code.toLowerCase().includes(cle.toLowerCase()) ||
          medoc.libelle.toLowerCase().includes(cle.toLowerCase())
        )
      },
      error: err=> console.log("Erreur de recherche")
    })

  }

  getAllMedicament(){
    this.productService.getTousLesMedicaments().subscribe({
      next : (medicaments)=> this.lesMedicaments = medicaments,
      error: (err) => console.log("Erreur de chargement des médicaments")
    })
  }

  reAjouterMedicamentAuCatalogue(medoc: Medicament) {
    if(confirm("Êtes vous certain d'ajouter ce médicament au catalogues?")){
      medoc.etat = "NONRETIRE"
      this.productService.updateMedicament(medoc).subscribe({
        next: (medoc)=>{
          this.getAllMedicament();
          alert("Le médicament est bien ajouté au catalogue")
        },
        error: (err) => console.log("Erreur d'ajout du medicament au catalogue")
      })
    }
  }


  getAllMouvementStock(){
    this.mouvementService.getAll().subscribe({
      next: (mouvements)=>{
        this.lesMouvementsStock = [];
        mouvements.forEach((mouv)=>{
          if(mouv.typeMouvement == "ENTREE"){
            this.lesMouvementsStock.push(mouv)
          }
        })
      }
    })
  }

  changeLesElementsAffiches(btn: any) {
    if(btn.index == 1){this.affichageCourant = this.allButtonsElements[0]}
    if(btn.index == 2){
      this.affichageCourant = this.allButtonsElements[1]
      this.getAllMouvementStock()
    }
  }

  rechercheDunMouvementParCle(){
    let contenuForm = this.formulaireFiltre.value
    let cle = contenuForm.valeurDeRecherche
    this.mouvementService.getAll().subscribe({
      next: (mouvements)=>{
        this.lesMouvementsStock= mouvements.filter((mouv) =>
          mouv.article.code.toLowerCase().includes(cle.toLowerCase())||
          mouv.article.libelle.toLowerCase().includes(cle.toLowerCase())
        )},
      error: err => console.log("Error de traitement des informations recherches")
    })
  }

  rechercheDeMouvementParMois(){

    let contenuForm = this.formulaireFiltre.value
    let  mois= contenuForm.leMoisDeFiltre

    this.mouvementService.getAll().subscribe({
      next: (mouvements)=>{
        this.lesMouvementsStock= mouvements.filter((mouv) =>
          new Date(mouv.dateMouvement).getMonth()+1 == mois

        )},
      error: err => console.log("Error de traitement des informations recherches")
    })

  }

  rechercheDeMouvementParAnnee(){

    let contenuForm = this.formulaireFiltre.value
    let  annee = contenuForm.lanneeDeFiltre

    this.mouvementService.getAll().subscribe({
      next: (mouvements)=>{
        this.lesMouvementsStock= mouvements.filter((mouv) =>
          new Date(mouv.dateMouvement).getFullYear() == annee

        )},
      error: err => console.log("Error de traitement des informations recherches")
    })

  }

  filtrerLesApprovisionnements(){
    let contenuForm = this.formulaireFiltre.value
    let  nombre = contenuForm.nombreRecent

    this.getAllMouvementStock()

  }

  protected readonly JSON = JSON;
}
