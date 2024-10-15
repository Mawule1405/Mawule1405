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
      this.authService.connecter(cred).subscribe({
        next: value=>{
          if(value.type=='client'){

            this.authService.stockCompteID(value)
            this.router.navigate(['/client/catalogues/tous-les-produits'])

          }else if(value.type == 'agent-opn'){
            this.router.navigate(['/agent/catalogues'])
          }
        },
        error : err=> {
          alert("Informations incorrectes")
        }
      })

    }else{
      alert("Informations Incorrectes")
    }

  }
}

 
  

  




