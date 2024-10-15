import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Medicament} from "../model/Medicament";
import {ProductService} from "../services/catalogue/product.service";
import {MouvementStockService} from "../services/catalogue/mouvement-stock.service";
import {MouvementStock} from "../model/MouvementStock";
import { DispositifMedical } from '../model/DispositifMedical';

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


  researchProduitsFormular!: FormGroup;
  lesMedicaments: Array<Medicament>= [];
  lesDispositfsMedicaux: Array<DispositifMedical> = []
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
    this.recupererLesDispositifsMedicaux()

    this.affichageCourant = this.allButtonsElements[0];
    this.formulaireFiltre = this.createFiltreFormular();
    this.researchProduitsFormular = this.createFormulaireDeRechercheDansCatalogue();
  }

  //Fonction pour créer un formulaire de filtre
  createFiltreFormular(){
    return this.formBuilder.group({
      valeurDeRecherche : this.formBuilder.control(""),
      leMoisDeFiltre : this.formBuilder.control( new Date().getMonth()+1),
      lanneeDeFiltre : this.formBuilder.control(new Date().getFullYear()),
      nombreRecent : this.formBuilder.control("tous")
    })
  }


  //Fonction pour créer un formulaire de recherche dans le catalogue
  createFormulaireDeRechercheDansCatalogue(){
    return this.formBuilder.group({
      cle : this.formBuilder.control("")
    })
  }

  //Rechercher un  de produits retiré du catalogue
  researchProduits() {

    //Formule de recherche sur les médicaments retirés du catalogues
    let cle = this.researchProduitsFormular.value.cle
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

    this.productService.recupererTousLesDispositifsMedicaux().subscribe({
      next: (dispos) => {
        this.lesDispositfsMedicaux = dispos.filter(dispo=>
          dispo.code.toLowerCase().includes(cle.toLowerCase()) ||
          dispo.libelle.toLowerCase().includes(cle.toLowerCase())
        )
      },
      error: err=> console.log("Erreur de recherche")
    })

  }
 

  //Récupérer tous les médicaments
  getAllMedicament(){
    this.productService.getTousLesMedicaments().subscribe({
      next : (medicaments)=> this.lesMedicaments = medicaments,
      error: (err) => console.log("Erreur de chargement des médicaments")
    })
  }


  //Réajouter un médicament au catalogue après retrait
  reAjouterMedicamentAuCatalogue(medoc: Medicament) {
    if(confirm("Êtes vous certain d'ajouter ce médicament au catalogues?")){
      medoc.etat = "NON_RETIRE"
      this.productService.updateMedicament(medoc).subscribe({
        next: (medoc)=>{
          this.getAllMedicament();
          alert("Le médicament est bien ajouté au catalogue")
        },
        error: (err) => console.log("Erreur d'ajout du medicament au catalogue")
      })
    }
  }


  //Recupérer tous les mouvements de stocks
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


  //Mise en action des boutons principales
  changeLesElementsAffiches(btn: any) {
    if(btn.index == 1){this.affichageCourant = this.allButtonsElements[0]}
    if(btn.index == 2){
      this.affichageCourant = this.allButtonsElements[1]
      this.getAllMouvementStock()
    }
  }

  //rechercher un mouvement de stock par un mot clé
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

  //Rechecher un mouvement de stock par mois
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


  //Rechercher un mouvement de stock par année
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


  //Passer un filtre sur les approvisionnemments
  filtrerLesApprovisionnements(){
    let contenuForm = this.formulaireFiltre.value
    let  nombre = contenuForm.nombreRecent

    this.getAllMouvementStock()

  }


  //Recupérer touts les dispositifs médicaux
  recupererLesDispositifsMedicaux(){
    this.productService.recupererTousLesDispositifsMedicaux().subscribe({
      next : dispos=> this.lesDispositfsMedicaux = dispos,
      error: err=> console.log("Erreur de chargement des dispositifs médicaux===>", err)
    })
  }


  //réajouter un dispositif médical au catalogue
  reAjouterDispositifMedicalAuCatalogue(dispo : DispositifMedical){
    if(confirm("Confirmer l'ajout du dispositif au catalogue!")){
      dispo.etat = "NON_RETIRE"
      this.productService.modifierUnDispositifMedical(dispo).subscribe({
        next: value=> this.recupererLesDispositifsMedicaux(),
        error: err=> console.log("Erreur lors de l'ajout du dispositif au catalogue")
      })
    }
  }


  protected readonly JSON = JSON;
}
