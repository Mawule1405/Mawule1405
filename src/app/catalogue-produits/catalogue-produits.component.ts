import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Dci } from '../model/Dci';
import { DciService } from '../services/catalogue/Dci.service';
import { SpecialitePharmaceutique } from '../model/SpecialitePharmaceutique';
import { SpecialityService } from '../services/catalogue/speciality.service';
import { FormeGalenique } from '../model/FormeGalenique';
import { FormGaleniqueService } from '../services/catalogue/form-galenique.service';
import {ProductService} from "../services/catalogue/product.service";
import { Medicament } from '../model/Medicament';
import {MouvementStock} from "../model/MouvementStock";
import {MouvementStockService} from "../services/catalogue/mouvement-stock.service";
import { DispositifMedical } from '../model/DispositifMedical';

@Component({
  selector: 'app-catalogue-produits',
  templateUrl: './catalogue-produits.component.html',
  styleUrl: './catalogue-produits.component.css'
})
export class CatalogueProduitsComponent implements OnInit{

  protected readonly JSON = JSON;

  public allButtonsElements = [
    {index:1, icon: "bi-list", title: "DCI"},
    {index:2, icon: "bi-boxes", title: "Specialités"},
    {index:3, icon: "bi-file-earmark-text", title: "Forme générique"},
    {index:4, icon: "bi-plus-circle", title: "Ajouter un médicament"},
    {index:5, icon: "bi-plus-circle", title: "Ajouter Dispositif médical"},
  ];

  public productPresentationButtons = [
    {index:1, icon: "bi-pencil",color:"light", title:"Modifier des informations sur le produit"},
    {index:2, icon: "bi-trash",color:"danger", title: "Retirer le produit du catalogue"},
    {index:3, icon: "bi-plus",color:"primary", title: "Enrégistrer un nouvel approvisionnement"}
  ]


  //Tous pour les DCIs de produits
  public paginationForDciSizes = [5, 10, 20 , 50, 100, 200, 500, 1000, 2000, 2500];
  public listOfDCIs : Array<Dci> = [];
  public currentDCIsPage = 1;
  public sizeDci =5;
  public totalPageOfDci=1;
  public DciIsVisible: boolean = false;
  public DciFormular! : FormGroup;

   //Tous pour les specialités de produits
   public paginationForSpecialitySizes = [5, 10, 20 , 50, 100, 200, 500, 1000, 2000, 2500];
   public listOfSpecialities : Array<SpecialitePharmaceutique> = [];
   public currentSpecialitiesPage = 1;
   public sizeSpeciality =5;
   public totalPageOfSpeciality=1;
   public specialityIsVisible: boolean = false;
   public specialityFormular! : FormGroup;


   //Tous pour les formes génériques
   public paginationForFormGaleniqueSizes = [5, 10, 20, 50 , 100, 200, 500, 1000, 2000, 2500];
   public listOfFormGalenique: Array<FormeGalenique> = [];
   public currentFormGaleniquesPage =1;
   public sizeFormGalenique = 200;
   public totalPageOfFormGalenique = 1;
   public formGaleniqueIsVisible: boolean = false;
   public formGaleniqueFormular! : FormGroup;

   //Gestion des médicaments
   public lesMedicaments : Array<Medicament> = [];
   public medicamentFormIsVisible : boolean = false;
   public medicamentImagePath :string = "assets/images/img.png";
  public medicamentImageUrl! : any;
   public medicamentFormular! : FormGroup;
   public unityLists = ["g", "cg", "cl", "ml"];

    //Gestion des médicaments
    public lesDisposidifsMedicaux : Array<DispositifMedical> = [];
    public dispositMedicalFormIsVisible : boolean = false;
    public dispositfMedicalImagePath :string = "assets/images/img.png";
    public  dispositifMedicalImageUrl! : any;
    public dispositifMedicalFormular! : FormGroup;
   

   //Gestion de l'approvisionnement des produits
   public procurementFormIsVisible =false;
   public procurementFormular! :FormGroup;
   public currentProcurementMedecine! : Medicament

   //Elément de recherches
   public researchProductsFormular! : FormGroup;

   //Modification d'un produit
   public medicamentModificationProductIsVisible = false;
   public medicamentModificationFormular! : FormGroup;

   image = new File([""], "assets/images/img.png")

  public constructor(
      private formBuilder: FormBuilder,
      private DciService: DciService,
      private specialityService: SpecialityService,
      private formGaleniqueService: FormGaleniqueService,
      private productService: ProductService,
      private mouvementStockService: MouvementStockService
  ) {
  }

  ngOnInit(): void {

    this.getOnePageOfDCIs(this.currentDCIsPage, this.sizeDci);
    this.getDciPaginationMetadata(this.currentDCIsPage, this.sizeDci);

    //Chargement des specialités
    this.getAllProductsSpecialities();
    this.getAllMedicine();

    //Chargement des formes pharmaceutiques
    this.getAllProductsFormGaleniques();

    this.DciFormular = this.createDciFormular();
    this.specialityFormular = this.createSpecialityFormular();
    this.formGaleniqueFormular = this.createFormGaleniqueForm();
    this.medicamentFormular = this.createMedicamentFormular();
    this.researchProductsFormular = this.createResearchFormular();
    this.medicamentModificationFormular = this.createMedicamentFormular();
  }

  openModalButton(bouton:any){
    if(bouton.index == 1){ this.DciIsVisible= true;}
    if(bouton.index == 2){ this.specialityIsVisible = true;}
    if(bouton.index == 3){ this.formGaleniqueIsVisible = true;}
    if(bouton.index == 4){ this.medicamentFormIsVisible  = true;}

  }

  closeModalButton(bouton:any){
    if(bouton.index == 1){ this.DciIsVisible= false;}
    if(bouton.index == 2){ this.specialityIsVisible= false;}
    if(bouton.index == 3){ this.formGaleniqueIsVisible = false;}
    if(bouton.index == 4){ this.medicamentFormIsVisible  = false;}

  }

  previousDciPage(){
    if(this.currentDCIsPage > 1){
      this.currentDCIsPage--;
      this.getOnePageOfDCIs(this.currentDCIsPage, this.sizeDci);
    }
  }

  nextDciPage(){
    if(this.currentDCIsPage < this.totalPageOfDci){
      this.currentDCIsPage++;
      this.getOnePageOfDCIs(this.currentDCIsPage, this.sizeDci);
    }
  }

  previousSpecialityPage(){

  }

  nextSpecialityPage(){

  }

  getDciPaginationMetadata(page: number, size: number){

    const numberOfDCIs = this.listOfDCIs.length;

    if (size > 0 && numberOfDCIs > 0) {
        this.totalPageOfDci = Math.ceil(numberOfDCIs / size);
    } else {
        this.totalPageOfDci = 1;
    }
      this.currentDCIsPage = page;

  }

  getProductsDCIs(){
    this.DciService.getAllDCIs().subscribe({
      next: values=>{this.listOfDCIs = values;},
      error: err=>{console.log("products DCIs loading error ")}
    });

  }

  getOnePageOfDCIs(page: number, size: number){
    this.DciService.getOnePageOfDCI(page, size).subscribe({
      next: values=>{this.listOfDCIs = values;},
      error: err=>{console.log("products DCIs loading error ")}
    })

  }

  choiceDciPaginationSize(){
    this.currentDCIsPage = 1;
    this.getOnePageOfDCIs(this.currentDCIsPage, this.sizeDci);
    this.getDciPaginationMetadata(this.currentDCIsPage, this.sizeDci);
  }

  createDciFormular(){
    return this.formBuilder.group({
      id :  this.formBuilder.control(""),
      nomDci : this.formBuilder.control("", Validators.required)
    })
  }

  //formulaire de création d'une spécialité
  createSpecialityFormular(){
    return this.formBuilder.group({
      id : this.formBuilder.control(null),
      libelleSpecialiteMedicament : this.formBuilder.control("", Validators.required),
      nomLaboratoire : this.formBuilder.control("", Validators.required),
      dci : this.formBuilder.control("", Validators.required),

    });
  }

  saveDci(){
    if(this.DciFormular.valid){
        if(confirm("Veuillez confirmer la sauvegarde")){
          let dci = this.DciFormular.value;
          this.DciService.saveDCI(dci).subscribe({
            next: value=>{
              dci = value;
              this.DciFormular.reset();
              this.getProductsDCIs();
            }
          })
        }
    }else{
      alert("Formulaire incomplète");
    }
  }

  modifyDci(dci : Dci){
      this.DciFormular.setValue({id:dci.id, nomDci : dci.nomDci});
  }

  deleteDci(Dci : Dci){
      if(confirm("Veuillez confirmer la suppression")){
        this.DciService.deleteDci(Dci).subscribe({
          next: value=>{
            this.getProductsDCIs();
            alert("La catégorie a été supprimer avec succès");
          },
          error: err=>console.log('Article Dci deleting error')
        })
      }
  }

  saveModificationDci(){
    let dci = this.DciFormular.value;
    if(this.DciFormular.valid){
       if(confirm("Souhaitez vous sauvegarder la modification")){
        this.DciService.updateDci(dci).subscribe({
          next: value=>{
            this.getProductsDCIs();
          },
          error: err=>{
            console.log("Article Dci update error");
          }
        })
       }
    }else{
      alert("Enrégistrement de la modification impossible!")
    }
  }

  /*
   * ====================================================================
   * ====================================================================
   * Méthodes pour la gestion des spécialités des produits
   */


  //Récupération de toutes les spécialités
  getAllProductsSpecialities(){
      this.specialityService.getAllProductsSpecialities().subscribe({
        next: values=> this.listOfSpecialities = values,
        error: err=> console.log("Article SpecialitePharmaceutique loading error")
      })
  }


  //Enregistrement d'une spécialité pharmaceutique
  saveModificationSpeciality(){
      let speciality = this.specialityFormular.value;
      if(this.specialityFormular.value){
        this.DciService.getDCI(speciality.dci).subscribe({
          next: value=>{
            let dci = value;
            speciality.dci = dci;
            this.specialityService.updateSpeciality(speciality).subscribe({
              next: value=> this.getAllProductsSpecialities(),
              error: err=>console.log("Erreur de sauvegarde de la modification")
            });
          }
        })
        
      }else{
        alert("Impossible de sauvegarder cette modification.")
      }
  }

  saveSpeciality(){
    let special = this.specialityFormular.value;
    if(this.specialityFormular.valid){
      if(confirm("Confirmez-vous les information?")){
        this.DciService.getDCI(special.dci).subscribe({
          next: dci =>{
              special.dci = dci;
              this.specialityService.saveSpeciality(special).subscribe({
                next: values=>  this.getAllProductsSpecialities(),
                error: err=> console.log("Article SpecialitePharmaceutique Saving")
              })
          },
          error: err=> console.log("Erreur de recherche du DCI")
        })
      }
    }else{
      alert("Information incorrecte!");
    }
  }

  modifySpeciality(speciality: SpecialitePharmaceutique){
    this.specialityFormular.setValue({
      id :speciality.id,
      libelleSpecialiteMedicament : speciality.libelleSpecialiteMedicament,
      nomLaboratoire : speciality.nomLaboratoire,
      dci: speciality.dci.id
    });
  }

  deleteSpeciality(speciality: SpecialitePharmaceutique){
    if(confirm("Confirmez-vous la suppression?")){
      this.specialityService.deleteSpeciality(speciality).subscribe({
        next: value=> {
          this.getAllProductsSpecialities();
          alert("Spécialité supprimés avec succès!")
        },
        error: err=> console.log("Article speciality deleting error")
      })
    }
  }

  choiceSpecialityPaginationSize(){}

  /**
   * ====================================================================
   * ====================================================================
   * Méthodes pour la gestion des formes génériques
   */

  //Formulaire de création d'une forme galénique
  createFormGaleniqueForm(){
    return this.formBuilder.group({
      id: this.formBuilder.control(null),
      nomFormeGalenique : this.formBuilder.control("", Validators.required),
      descriptionFormeGalenique: this.formBuilder.control('')
    })
  }

  getAllProductsFormGaleniques(){
      this.formGaleniqueService.getAllFormGaleniques().subscribe({
        next: value=>  this.listOfFormGalenique = value,
        error: err=> console.log("Erreur de la forme générique?")
      })
  }

  //Modifier une forme galénique
  saveModificationFormGalenique(){
    if(this.formGaleniqueFormular.valid){
      if(confirm('Confirmez-vous la sauvegarde de la modification?')){
        let formGalenique= this.formGaleniqueFormular.value;
        this.formGaleniqueService.updateFormGalenique(formGalenique).subscribe({
          next: value=>{
            this.getAllProductsFormGaleniques();
          },
          error: err=>console.log("Erreur de sauvegarde de la modification.")
        })
      }
    }
  }

  //Enrégistrer une nouvelle forme galénique
  saveFormGalenique(){
    if(this.formGaleniqueFormular.valid){
      if(confirm("Confirmez-vous les informations?")){
        let formGalenique = this.formGaleniqueFormular.value;
        this.formGaleniqueService.saveFormGalenique(formGalenique).subscribe({
          next: value=> this.getAllProductsFormGaleniques(),
          error: err=> console.log("Erreur lors de la sauvegarde d'une forme générique")
        })
      }
    }else{
      alert("Information incorrecte!")
    }
  }

  //Lancer la modification d'une forme galénique
  modifyFormGalenique(formGalenique: FormeGalenique){
    this.formGaleniqueFormular.setValue({
      id: formGalenique.id,
      nomFormeGalenique: formGalenique.nomFormeGalenique,
      descriptionFormeGalenique : formGalenique.descriptionFormeGalenique
    });
  }

  deleteFormGalenique(formGalenique : FormeGalenique){
    if(confirm("Confirmez-vous la suppression?")){
      this.formGaleniqueService.deleteFormGalenique(formGalenique).subscribe({
        next: value=>{
          this.getAllProductsFormGaleniques();
          alert("Forme générique supprimer avec succès!");
        },
        error: err=>console.log("Erreur de suppression de la forme générique.")
      })
    }
  }

  choiceFormGaleniquePaginationSize(){}
  previousFormGaleniquePage(){}
  nextFormGaleniquePage(){}


  /**
   * ============================================================================
   * ============================================================================
   * Gestion du catalogues
   */

  

  //Formulaire de création d'un produit
  createProductFormular() {
    return this.formBuilder.group({
      id: this.formBuilder.control(null),
      code : this.formBuilder.control("", [Validators.required]),
      libelle: this.formBuilder.control('', [Validators.required]),
      prixGenerique: this.formBuilder.control(0, [Validators.required, Validators.min(0)]),
      quantiteStock: this.formBuilder.control(0, [Validators.required, Validators.min(0)]),
      etat: this.formBuilder.control("NONRETIRE"),
      formePharmaceutique: this.formBuilder.control(null, [Validators.required]),
      description: this.formBuilder.control(''),
      specialite: this.formBuilder.control(null, [Validators.required]),
    });
  }

  //Formulaire de création d'un médicament
  createMedicamentFormular(){
    return this.formBuilder.group({
      id: this.formBuilder.control(""),
      code : this.formBuilder.control("", [Validators.required]),
      libelle: this.formBuilder.control('', [Validators.required]),
      concentration: this.formBuilder.control(0, [Validators.required, Validators.min(0)] ),
      uniteConcentration: this.formBuilder.control("", [Validators.required]),
      prixGenerique : this.formBuilder.control(0, [Validators.required, Validators.min(0)]),
      quantiteStock: this.formBuilder.control(0),
      etat: this.formBuilder.control("NONRETIRE"),
      formeGalenique: this.formBuilder.control("", [Validators.required]),
      description: this.formBuilder.control(''),
      image: this.formBuilder.control(''),
      specialite: this.formBuilder.control("", [Validators.required])
    });

  }


  //Recherche une forme galénique avec son id
  rechercheDuneFormeGalenique(id: string) {
    return this.listOfFormGalenique.find(formGalenique => formGalenique.id === id);
  }


  //Recherche une specialite galenique avec son id
  rechercheDuneSpecialite(id: string){
    return this.listOfSpecialities.find(specilite=>specilite.id==id);
  }
  

  //Enrégistrer un produit
  saveProduct(){
    if(this.medicamentFormular.valid){
      if(confirm("Êtes vous certains de l'exactitude des informations")){

        //Traitement des informations
        let value= this.medicamentFormular.value;
        value.etat = "NONRETIRE"
        value.specialitePharmaceutique =this.rechercheDuneSpecialite(value.specialite)
        value.formeGalenique = this.rechercheDuneFormeGalenique(value.formeGalenique)
        

        //Enrégistrement des informations
        this.productService.saveMedicament(value).subscribe({
          next: value=>{
            alert("Sauvegarde de produit effectuée avec succès")
            this.getAllMedicine();
            this.medicamentFormular.reset()
            this.medicamentFormIsVisible= false;
          },
          error: err=>{
            alert("Erreur de sauvegarde du produit: "+err);
          }
        });
      }
    }
  }


  //Choisir l'image du médicament
  choiceProductImage(event:any){
    if(event.target.files && event.target.files.length>0){
      const file = event.target.files[0];
      const mimeType = file.type;
      if(!mimeType.match(/image\/*/)){
        console.log("Seuls les images sont supportés");
        return;
      }

      this.medicamentImagePath = file;
      this.medicamentFormular.patchValue({image: this.medicamentImagePath});

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload= ()=>{
        this.medicamentImageUrl = reader.result;
        this.medicamentImagePath = this.medicamentImageUrl;

      };

      reader.onerror=(error)=>{
        console.log('Error while reading file: ', error);
      };
    }
  }


  /*
  ===========================================================
  Gestion des médicaments
  */
  createResearchFormular(){
    return this.formBuilder.group({
      key: this.formBuilder.control("")
    });
  }


  getAllMedicine(){
    this.productService.getTousLesMedicaments().subscribe({
      next: values=>{
          this.lesMedicaments = values;

      },
      error: err=>{
        console.log("Erreur de récupération des médiments");
      }
    })
  }

  researchProducts(){
      let key = this.researchProductsFormular.value;
      console.log(key.key)
      this.productService.researchMedicament(key).subscribe({
        next: value=> {
          this.lesMedicaments = value.filter(medoc =>
            medoc.libelle.toLowerCase().includes(key.key.toLowerCase()) ||
            medoc.code.toLowerCase().includes(key.key.toLowerCase())
          );},
        error: err=> console.log("Error lors de la recherche")
      })
  }

  updateMedicament(medoc: Medicament){
    this.productService.updateMedicament(medoc).subscribe({
      next: value => this.getAllMedicine(),
      error: err=> console.log("ERROR DE MISES A JOURS ===> "+err)
    })
  }

  /**
   * Gestion des différents boutons d'action d'un médicament présenter dans le catalogue
   */
  createProcurementFormular(){
    return this.formBuilder.group({
      quantite: this.formBuilder.control(1, [Validators.required, Validators.min(1)]),
      dateMouvement: this.formBuilder.control(Date.now()),
      prixAchatUnitaire: this.formBuilder.control(0, [Validators.required, Validators.min(0)]),
      prixVenteUnitaire: this.formBuilder.control(0, [Validators.required, Validators.min(0)]),
      dateExpiration: this.formBuilder.control(Date.now(), [Validators.required]),
      typeMouvement: this.formBuilder.control("ENTREE"),
    })
  }

  closeProcurementModal(){
    this.procurementFormIsVisible = false
  }


  onClickMedicineButton(bt:any, medoc: Medicament){
    if(bt.index == 1){

      this.medicamentModificationProductIsVisible = true
      console.log(medoc)
      this.medicamentImagePath = medoc.image
      this.medicamentModificationFormular.setValue({
            id: medoc.id,
            code : medoc.code,
            libelle : medoc.libelle,
            quantiteStock: medoc.quantiteStock,
            etat: medoc.etat,
            prixGenerique: medoc.prixGenerique,
            concentration: medoc.concentration,
            uniteConcentration: medoc.uniteConcentration,
            specialite: medoc.specialitePharmaceutique.id,
            formeGalenique: medoc.formeGalenique.id,
            description : medoc.description,
            image: medoc.image
      });



      this.updateMedicamentInformation(medoc);
    }else if(bt.index == 2){
      this.retirerLeMedicament(medoc);
    }
    else if(bt.index == 3){
      this.procurementFormular = this.createProcurementFormular()
      this.procurementFormIsVisible = true
      this.currentProcurementMedecine = medoc;
    }
  }

  /**
   * méthode d'enregistrement d'un approvisionnement
   * @param medoc : element à approvisionner
   */
  closeModificationProduct(){
    this.medicamentModificationProductIsVisible = false
  }
  saveTheProcurement(medoc: Medicament) {
    if (this.procurementFormular.valid) {

      if(confirm("Veuillez confirmer les informations saisis")){
        let procurement: MouvementStock = this.procurementFormular.value;

        // Assignation des valeurs
        medoc.quantiteStock = medoc.quantiteStock + procurement.quantite;
        procurement.article = medoc;
        procurement.dateMouvement = new Date();
        procurement.typeMouvement = "ENTREE";

        this.mouvementStockService.save(procurement).subscribe({
          next: (procurement) =>{
            this.updateMedicament(medoc);
            this.procurementFormular.reset()
            this.procurementFormIsVisible = false;
            alert("Approvisionnement effectué avec succès!")
          }
        })


      }

    } else {

      alert("Informations incomplètes")
    }
  }

  retirerLeMedicament(medoc:Medicament){
    if(confirm("Vous êtes sur de retirer le médicament:\n"+
      "Code : "+medoc.code+"\n"+
      "Libellé  : "+medoc.libelle+"\n"+
      "Quantité       : "+medoc.quantiteStock
    )){
      medoc.etat="RETIRE"
      this.productService.updateMedicament(medoc).subscribe({
        next: (medoc)=> this.getAllMedicine(),
        error: err=> console.log("Error de retrait du medicament du catalogue.")
      })
    }
  }

  updateMedicamentInformation(medoc : Medicament){
      console.log("MISE A JOUR ========>")
  }

  //Formulaire de creation d'un dispositif médical
  creerUnFormulaireDeDispositifMedical() {
    return this.formBuilder.group({
      id: this.formBuilder.control(null),
      code : this.formBuilder.control("", [Validators.required]),
      libelle: this.formBuilder.control('', [Validators.required]),
      prixGenerique: this.formBuilder.control(0, [Validators.required, Validators.min(0)]),
      quantiteStock: this.formBuilder.control(0, [Validators.required, Validators.min(0)]),
      etat: this.formBuilder.control("NONRETIRE"),
      paysFabricant: this.formBuilder.control("", Validators.required)
    });
  }


}
