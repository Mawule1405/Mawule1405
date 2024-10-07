import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {URL} from "../../model/URL";
import { Observable } from 'rxjs';
import { Medicament } from '../../model/Medicament';
import { DispositifMedical } from '../../model/DispositifMedical';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private http : HttpClient) { }

  //récupérer tous les médicaments
  getTousLesMedicaments():Observable<Array<Medicament>>{
    return this.http.get<Array<Medicament>>(`${URL.BASE_URL}${URL.MEDICAMENT_URL}`);
  }


  //Enrégistrer un medicament
  saveMedicament(value:any){
      alert(JSON.stringify(value))
    return this.http.post(`${URL.BASE_URL}${URL.MEDICAMENT_URL}`,
      {medicamentDto: value, formeGalenique: value.formeGalenique, idSpecialitePharmaceutique:value.specialite});
  }

  //Recherche un medicament
  researchMedicament(key: any): Observable<Array<Medicament>> {
    return this.http.get<Array<Medicament>>(
      `${URL.BASE_URL}${URL.MEDICAMENT_URL}?nomGenerique_like=${key.key}&nomCommercial_like=${key.key}`
    );
  }

  //modifier un medicament d'un médicament
  updateMedicament(medoc : Medicament):Observable<Medicament>{
    return this.http.patch<Medicament>(`${URL.BASE_URL}${URL.MEDICAMENT_URL}/${medoc.id}`, medoc)
  }

  //récupérer tous les dispositfs médicaux
  recupererTousLesDispositifsMedicaux(): Observable<DispositifMedical[]>{
    return this.http.get<DispositifMedical[]>(`${URL.BASE_URL}${URL.DISPOSITIF_MEDICAL_URL}`)
  }

  //enregistrer un dispositif médical
  enregistrerUneDispositifMedical(dispo: DispositifMedical): Observable<DispositifMedical>{
    return this.http.post<DispositifMedical>(`${URL.BASE_URL}${URL.DISPOSITIF_MEDICAL_URL}`, dispo)
  }

  //recuperer un dispositif médical

}
