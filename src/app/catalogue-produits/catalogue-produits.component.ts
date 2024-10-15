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

    //Gestion des dispositifs Médicaux
    public lesDisposidifsMedicaux : Array<DispositifMedical> = [];
    public dispositifMedicalFormIsVisible : boolean = false;
    public dispositfMedicalImagePath :string = "assets/images/img.png";
    public  dispositifMedicalImageUrl! : any;
    public dispositifMedicalFormular! : FormGroup;
    dispositifMedicalModificationFormular! : FormGroup;
    currentProcurementDispositif! : DispositifMedical
    dispositifMedicalModificationProductIsVisible : boolean = false
   

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
    this.recupererLesdispositifsMedicaux()

    //Chargement des formes pharmaceutiques
    this.getAllProductsFormGaleniques();

    this.DciFormular = this.createDciFormular();
    this.specialityFormular = this.createSpecialityFormular();
    this.formGaleniqueFormular = this.createFormGaleniqueForm();
    this.medicamentFormular = this.createMedicamentFormular();
    this.researchProductsFormular = this.createResearchFormular();
    this.medicamentModificationFormular = this.createMedicamentFormular();
    this.dispositifMedicalFormular = this.createDispositifMedicalFormular();
    this.dispositifMedicalModificationFormular = this.createDispositifMedicalFormular();
  }

  openModalButton(bouton:any){
    if(bouton.index == 1){ this.DciIsVisible= true;}
    if(bouton.index == 2){ this.specialityIsVisible = true;}
    if(bouton.index == 3){ this.formGaleniqueIsVisible = true;}
    if(bouton.index == 4){ this.medicamentFormIsVisible  = true;}
    if(bouton.index == 5){this.dispositifMedicalFormIsVisible = true;}

  }

  closeModalButton(bouton:any){
    if(bouton.index == 1){ this.DciIsVisible= false;}
    if(bouton.index == 2){ this.specialityIsVisible= false;}
    if(bouton.index == 3){ this.formGaleniqueIsVisible = false;}
    if(bouton.index == 4){ this.medicamentFormIsVisible  = false;}
    if(bouton.index == 5){ this.dispositifMedicalFormIsVisible = false;}

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
              
              this.getProductsDCIs();
              this.DciFormular.reset();
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
            alert("La Dci a été supprimer avec succès");
          },
          error: err=>{
            console.log('Article Dci deleting error')
            alert("Cette DCI ne peut pas être supprimer!")
          }
        })
      }
  }

  saveModificationDci(){
    let nouvelleInformationDci = this.DciFormular.value;
    let ancienneInformationDci = this.listOfDCIs.find(dci=>dci.id=nouvelleInformationDci.id);
    if(ancienneInformationDci){
      ancienneInformationDci.nomDci = nouvelleInformationDci.nomDci;
    }
        

    if(this.DciFormular.valid && ancienneInformationDci){
       if(confirm("Souhaitez vous sauvegarder la modification")){
        this.DciService.updateDci(ancienneInformationDci).subscribe({
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


  //Enregistrement de la modification d'une spécialité pharmaceutique
  saveModificationSpeciality(){
      let speciality = this.specialityFormular.value;
      if(this.specialityFormular.value){
        this.DciService.getDCI(speciality.dci).subscribe({
          next: value=>{
            let dci = value;
            speciality.dci = dci;
            this.specialityService.updateSpeciality(speciality).subscribe({
              next: value=> {this.getAllProductsSpecialities()
                this.specialityFormular.reset()
              },
              error: err=>console.log("Erreur de sauvegarde de la modification")
            });
          }
        })
        
      }else{
        alert("Impossible de sauvegarder cette modification.")
      }
  }


  //Enrégistrement d'une nouvelle spécialité
  saveSpeciality(){
    let special = this.specialityFormular.value;
    if(this.specialityFormular.valid){
      if(confirm("Confirmez-vous les information?")){
        
              this.specialityService.saveSpeciality(special).subscribe({
                next: values=>  {
                  this.getAllProductsSpecialities()
                  this.specialityFormular.reset()
                },
                error: err=> console.log("Erreur de sauvegarde de la spécialité")
              })
         
      }
    }else{
      alert("Information incorrecte!");
    }
  }


  //Lancement de la modification d'une spécialité
  modifySpeciality(speciality: SpecialitePharmaceutique){
    this.specialityFormular.setValue({
      id :speciality.id,
      libelleSpecialiteMedicament : speciality.libelleSpecialiteMedicament,
      nomLaboratoire : speciality.nomLaboratoire,
      dci: speciality.dci.id
    });
  }


  //Suppression d'une spécialité
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

  
  //Formulaire de création d'un dispositif médical
  createDispositifMedicalFormular(){
    return this.formBuilder.group({
      id: this.formBuilder.control(""),
      code : this.formBuilder.control("", [Validators.required]),
      libelle: this.formBuilder.control('', [Validators.required]),
      paysFabrication : this.formBuilder.control("", [Validators.required]),
      prixGenerique : this.formBuilder.control(0, [Validators.required, Validators.min(0)]),
      quantiteStockSeuil: this.formBuilder.control(0, [Validators.required]),
      quantiteStock: this.formBuilder.control(0),
      etat: this.formBuilder.control("NON_RETIRE"),
      description: this.formBuilder.control(""),
      cheminImage: this.formBuilder.control("")
    })
  }


  //Enrégistrer un disposif médical
  enregistrerUnDispositifMedical(){
    if(this.dispositifMedicalFormular.valid){
      let value = this.dispositifMedicalFormular.value
      value.quantiteStock =0
      value.etat = "NON_RETIRE"
      if(confirm("Confirmez vous les informations!")){
          this.productService.enregistrerUnDispositifMedical(value).subscribe({
            next: value=>{
              this.recupererLesdispositifsMedicaux()
              this.dispositifMedicalFormular.reset()
              alert("Enrégistrement effectuée avec succès!")
            }
          })
      }
    }
  }


  //Formulaire de création d'une forme galénique
  createFormGaleniqueForm(){
    return this.formBuilder.group({
      id: this.formBuilder.control(null),
      nomFormeGalenique : this.formBuilder.control("", Validators.required),
      descriptionFormeGalenique: this.formBuilder.control('')
    })
  }


  //Récupérer toutes les formes galéniques
  getAllProductsFormGaleniques(){
      this.formGaleniqueService.getAllFormGaleniques().subscribe({
        next: value=>  this.listOfFormGalenique = value,
        error: err=> console.log("Erreur de la forme générique?")
      })
  }


  //Enrégistrer la modification d'une forme galénique
  saveModificationFormGalenique(){
    if(this.formGaleniqueFormular.valid){
      if(confirm('Confirmez-vous la sauvegarde de la modification?')){
        let formGalenique= this.formGaleniqueFormular.value;
        let ancienneInformation = this.listOfFormGalenique.find(forme=>forme.id= formGalenique.id)

        if(ancienneInformation)
        {
          ancienneInformation.nomFormeGalenique = formGalenique.nomFormeGalenique;
          ancienneInformation.descriptionFormeGalenique = formGalenique.descriptionFormeGalenique

          this.formGaleniqueService.updateFormGalenique(ancienneInformation).subscribe({
            next: value=>{
              this.formGaleniqueFormular.reset()
              this.getAllProductsFormGaleniques();
            },
            error: err=>console.log("Erreur de sauvegarde de la modification.")
          })
        }

      }else(
        alert("Modification Impossible")
      )
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


  //Supprimer une forme galénique
  deleteFormGalenique(formGalenique : FormeGalenique){
    if(confirm("Confirmez-vous la suppression?")){
      if(formGalenique.isDeleted){
        this.formGaleniqueService.deleteFormGalenique(formGalenique).subscribe({
          next: value=>{
            this.getAllProductsFormGaleniques();
            alert("Forme générique supprimer avec succès!");
          },
          error: err=>console.log("Erreur de suppression de la forme générique.")
        })
      }else{
        alert("Impossible de supprimer cette forme galénique!")
      }
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
      quantiteStockSeuil: this.formBuilder.control(0, [Validators.required]),
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
      quantiteStockSeuil: this.formBuilder.control(0, [Validators.required]),
      etat: this.formBuilder.control("NON_RETIRE"),
      formeGalenique: this.formBuilder.control("", [Validators.required]),
      description: this.formBuilder.control(''),
      cheminImage: this.formBuilder.control(''),
      specialitePharmaceutique: this.formBuilder.control("", [Validators.required])
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
        value.etat = "NON_RETIRE"
        value.specialitePharmaceutique ={id: value.specialitePharmaceutique}
        value.formeGalenique = {id: value.formeGalenique}
        

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

  //Récupérer tous les médicaments
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

  //Rechercher un produit par libellé et par code
  researchProducts(){
      let key = this.researchProductsFormular.value;
      
      this.productService.researchMedicament(key).subscribe({
        next: value=> {
          
          this.lesMedicaments = value.filter(medoc =>
            medoc.libelle.toLowerCase().includes(key.key.toLowerCase()) ||
            medoc.code.toLowerCase().includes(key.key.toLowerCase())
          );},
        error: err=> console.log("Error lors de la recherche")
      });

      //Filtre sur les dispositifs médicals
      this.productService.rechercherDesDispisitifs(key).subscribe({
        next: value=> {
          this.lesDisposidifsMedicaux = value.filter(medoc =>
            medoc.libelle.toLowerCase().includes(key.key.toLowerCase()) ||
            medoc.code.toLowerCase().includes(key.key.toLowerCase())
          );},
        error: err=> console.log("Error lors de la recherche")
      });

      
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
      
      this.medicamentImagePath = medoc.cheminImage
      this.medicamentModificationFormular.setValue({
            id: medoc.id,
            code : medoc.code,
            libelle : medoc.libelle,
            quantiteStock: medoc.quantiteStock,
            etat: medoc.etat,
            prixGenerique: medoc.prixGenerique,
            concentration: medoc.concentration,
            quantiteStockSeuil: medoc.quantiteStockSeuil,
            uniteConcentration: medoc.uniteConcentration,
            specialitePharmaceutique: medoc.specialitePharmaceutique.id,
            formeGalenique: medoc.formeGalenique.id,
            description : medoc.description,
            cheminImage: medoc.cheminImage
      });



      
    }else if(bt.index == 2){
      this.retirerLeMedicament(medoc);
    }
    else if(bt.index == 3){
      this.procurementFormular = this.createProcurementFormular()
      this.procurementFormIsVisible = true
      this.currentProcurementMedecine = medoc;
    }
  }

  //Action réaliser par les trois boutons d'un dispositif médical
  onClickDispositifMedicalButton(bt: any,dispo: DispositifMedical){
    if(bt.index == 1){
      
      this.dispositifMedicalModificationProductIsVisible = true
      
      this.medicamentImagePath = dispo.cheminImage
      this.dispositifMedicalModificationFormular.setValue({
            id: dispo.id,
            code : dispo.code,
            libelle : dispo.libelle,
            paysFabrication : dispo.paysFabrication,
            quantiteStock: dispo.quantiteStock,
            quantiteStockSeuil: dispo.quantiteStockSeuil,
            etat: dispo.etat,
            prixGenerique: dispo.prixGenerique,
            description : dispo.description,
            cheminImage: dispo.cheminImage
      });


      
      this.updateDispositifMedicalInformation(dispo);
    }else if(bt.index == 2){
      this.retirerLeDispositifMedical(dispo);
    }
    else if(bt.index == 3){
      this.procurementFormular = this.createProcurementFormular()
      this.procurementFormIsVisible = true
      this.currentProcurementDispositif = dispo;
    }
  }


  //Modifier les informations d'un dispositf médical
  updateDispositifMedicalInformation(dispo: DispositifMedical){

  }


  //Retirer le dispositif du catalogue
  retirerLeDispositifMedical(dispo : DispositifMedical){
      
      if(confirm("Êtes vous certain de retirer ce produit du catalogue?")){
        dispo.etat= "RETIRE"
        this.productService.modifierUnDispositifMedical(dispo).subscribe({
          next: value=> this.recupererLesdispositifsMedicaux(),
          error: err=> console.log("Erreur de modification", err)
        })
      }
  }


  closeModificationProduct(){
    this.medicamentModificationProductIsVisible = false
    this.dispositifMedicalModificationProductIsVisible = false
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

  

  //Mise à jour d'un médicament
  miseAjourMedicament(){
      
      if(this.medicamentModificationFormular.valid){
        if(confirm("Confirmer la modification")){
          let medicament = this.medicamentModificationFormular.value



          this.productService.updateMedicament(medicament).subscribe({
            next: value=> {
              this.getAllMedicine()
              this.medicamentModificationProductIsVisible = false
            },
            error: err=> console.log("Erreur de mise à jour")
          })
        }
      }
      
  }

  //Mise à jour d'un dispositif médical
  miseAjourDispositif(){
    if(this.dispositifMedicalModificationFormular.valid){
      if(confirm("Confirmer la modification")){
        let dispositof = this.dispositifMedicalModificationFormular.value



        this.productService.updateMedicament(dispositof).subscribe({
          next: value=> {
            this.recupererLesdispositifsMedicaux()
            this.dispositifMedicalModificationProductIsVisible = false
          },
          error: err=> console.log("Erreur de mise à jour")
        })
      }
    }
  }



  //Recupérer tous les dispositifs médicaux
  recupererLesdispositifsMedicaux(){
    this.productService.recupererTousLesDispositifsMedicaux().subscribe({
      next: values=> this.lesDisposidifsMedicaux = values,
      error: err=> console.log(err)
    })
  }


}
