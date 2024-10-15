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
  saveMedicament(value:Medicament){
      alert(JSON.stringify(value))
    return this.http.post(`${URL.BASE_URL}${URL.MEDICAMENT_URL}`, value);
  }

  //Recherche un medicament
  researchMedicament(key: any): Observable<Array<Medicament>> {
    return this.http.get<Array<Medicament>>(
      `${URL.BASE_URL}${URL.MEDICAMENT_URL}?code_like=${key.key}&libelle_like=${key.key}`
    );
  }

  //modifier un medicament d'un médicament
  updateMedicament(medoc : Medicament):Observable<Medicament>{
    return this.http.put<Medicament>(`${URL.BASE_URL}${URL.MEDICAMENT_URL}`, medoc)
  }

  //récupérer tous les dispositfs médicaux
  recupererTousLesDispositifsMedicaux(): Observable<DispositifMedical[]>{
    return this.http.get<DispositifMedical[]>(`${URL.BASE_URL}${URL.DISPOSITIF_MEDICAL_URL}`)
  }

  //enregistrer un dispositif médical
  enregistrerUnDispositifMedical(dispo: DispositifMedical): Observable<DispositifMedical>{
    return this.http.post<DispositifMedical>(`${URL.BASE_URL}${URL.DISPOSITIF_MEDICAL_URL}`, dispo)
  }

  //recuperer un dispositif médical
  recupererUnDispositifMedical(id: string): Observable<DispositifMedical>{
    return this.http.get<DispositifMedical>(`${URL.BASE_URL}${URL.DISPOSITIF_MEDICAL_URL}/${id}`)
  }

  
  //Recherche  medicament
  rechercherDesDispisitifs(key: any): Observable<Array<DispositifMedical>> {
    return this.http.get<Array<DispositifMedical>>(
      `${URL.BASE_URL}${URL.DISPOSITIF_MEDICAL_URL}?code_like=${key.key}&libelle_like=${key.key}`
    );
  }

  modifierUnDispositifMedical(dispo: DispositifMedical): Observable<DispositifMedical>{
    return this.http.put<DispositifMedical>(`${URL.BASE_URL}${URL.DISPOSITIF_MEDICAL_URL}`, dispo)
  }


}
