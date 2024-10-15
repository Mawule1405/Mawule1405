import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfilService } from '../services/comptes/profil.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-compte-client',
  templateUrl: './create-compte-client.component.html',
  styleUrl: './create-compte-client.component.css'
})
export class CreateCompteClientComponent implements OnInit{

  protected readonly JSON = JSON;
  clientForm! : FormGroup


  constructor(private profileService: ProfilService,
              private router: Router,
              private fb: FormBuilder){}


  ngOnInit(): void {
      this.clientForm = this.creerFormulaireDinscription()
  }

  //creer le formulaire d'inscription
  creerFormulaireDinscription(){
    return this.clientForm = this.fb.group({
      id: this.fb.control(null),
      identifiant: this.fb.control(null, [Validators.required]),
      motDePasse: this.fb.control(null, [Validators.required, Validators.minLength(8)]),
      adresse: this.fb.control(null, [ Validators.required]),
      numeroTelephone: this.fb.control(null, [ Validators.required]),
      email: this.fb.control(null, [Validators.required, Validators.email]),
      nomEntreprise: this.fb.control(null, [Validators.required]),
      numeroAccreditation: this.fb.control(null, [Validators.required]),
      typeStructure: this.fb.control(null, [Validators.required]),
      nomDuResponsable: this.fb.control(null, [Validators.required]),
      numeroContactResponsable: this.fb.control(null, [Validators.required]),
      cheminPhoto: this.fb.control(null)
    });
  }

  //enrégistrer les informations d'inscription
  onSubmit(){
    if(this.clientForm.valid){
        if(confirm("Les informations sont-elles correctes?")){
          let client = this.clientForm.value
          this.profileService.enregistrerUnClient(client).subscribe({
            next: client => {
              alert("Votre compte a bien été enrégistrer. Vous recevez une confirmation de validation par email de votre demande.")
              this.router.navigate(['/home'])
            },
            error: err=> {
              console.log("Erreur d'inscription")
            }
          })
        }
    }else{
      alert("Informations insuffisantes")
    }
  }

  //charger un fichier comme preuve
  onFileChange(event: any){
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.clientForm.patchValue({
        cheminPhoto: file
      });
    }
  }


}
