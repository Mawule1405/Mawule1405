import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfilService } from '../services/comptes/profil.service';
import { Client } from '../model/Client';
import { Agent } from '../model/Agent';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/comptes/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  protected readonly JSON = JSON;
  passwordForget: boolean = false;
  time: number = 59;
  timeCurrent: number = 0;


  //Login Formular declaration
  public loginFormular! : FormGroup;

  public clients: Array<Client> =[];
  public agents : Array<Agent >= [];
  public comptes: Array<any>=[];


public constructor(
  private formBuilder: FormBuilder,
  private profilService: ProfilService,
  private router: Router,
  private authService: AuthService
){}



  ngOnInit(): void {

    this.loginFormular= this.createLoginFormular();
    this.getAgents();
    this.getClients();
  }

  getClients(){
    this.profilService.getClientProfil().subscribe({
      next:comptes=> this.clients = comptes,
      error: err=>console.log("Erreur de chargement des clients")
    })
  }
  getAgents(){
    this.profilService.getAgentProfil().subscribe({
      next:comptes=> this.agents = comptes,
      error: err=>console.log("Erreur de chargement des agents")
    })
  }

  clickPassWordLink(){
    this.passwordForget =true;
  }

  createLoginFormular(){
    return this.formBuilder.group({
      identifiant: this.formBuilder.control("",[Validators.required]),
      motDePasse: this.formBuilder.control("", [Validators.required])
    })
  }



  login() {
    if (this.loginFormular.valid) {
      let cred = this.loginFormular.value;

      const comptes = [...this.agents, ...this.clients];

      let utilisateurTrouve = false;

      comptes.forEach((compte) => {
        if (compte.nomUtilisateur === cred.identifiant && compte.motDePasse === cred.motDePasse) {
          utilisateurTrouve = true;

          // Utiliser AuthService pour stocker les informations du compte
          this.authService.setCompteInfo(compte);
          this.authService.stockPanier(compte)

          if (compte.typeCompte === "client") {
            this.router.navigate(['/client/catalogues/tous-les-produits']);
          } else if (compte.typeCompte === "agent") {
            this.router.navigate(['/agent']);
          }
        }
      });

      if (!utilisateurTrouve) {
        alert("Veuillez vérifier l'identifiant ou le mot de passe");
      }
    } else {
      alert("Veuillez vérifier le formulaire de connexion");
    }
  }

}

 
  

  




