import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {URL} from "../../model/URL";
import { Observable } from 'rxjs';
import { Medicament } from '../../model/Medicament';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private http : HttpClient) { }


  getTousLesMedicaments():Observable<Array<Medicament>>{
    return this.http.get<Array<Medicament>>(`${URL.BASE_URL}${URL.MEDICAMENT_URL}`);
  }

  saveMedicament(value:any){
    let product ={
      code: value.code,
      libelle: value.libelle,
      concentration: value.concentration,
      uniteConcentration: value.uniteConcentration,
      description: value.description,
      quantiteStock: 0,
      etat: "NONRETIRE",
      prixGenerique: value.prixGenerique,
      quantiteSeuil: value.quantiteSeuil,
      image: value.image,
      specialite: {id: value.specialite},
      formeGalenique: {id : value.formeGalenique}
    }
    return this.http.post(`${URL.BASE_URL}${URL.MEDICAMENT_URL}`, product);
  }

  researchMedicament(key: any): Observable<Array<Medicament>> {
    return this.http.get<Array<Medicament>>(
      `${URL.BASE_URL}${URL.MEDICAMENT_URL}?nomGenerique_like=${key.key}&nomCommercial_like=${key.key}`
    );
  }

  updateMedicament(medoc : Medicament):Observable<Medicament>{
    return this.http.patch<Medicament>(`${URL.BASE_URL}${URL.MEDICAMENT_URL}/${medoc.id}`, medoc)
  }

}
