import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {URL} from "../../model/URL";
import { FormeGalenique } from '../../model/FormeGalenique';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormGaleniqueService {

  constructor(
    private http: HttpClient
  ) { }

  getAllFormGaleniques():Observable<Array<FormeGalenique>>{
    return this.http.get<Array<FormeGalenique>>(`${URL.BASE_URL}${URL.FORM_GENERIQUE_URL}`);
  }

  saveFormGalenique(formGrenerique : FormeGalenique):Observable<FormeGalenique>{
    let form = {nomFormeGalenique: formGrenerique.nomFormeGalenique};
    return this.http.post<FormeGalenique>(`${URL.BASE_URL}${URL.FORM_GENERIQUE_URL}/`, form);
  }


  deleteFormGalenique(form: FormeGalenique):Observable<FormeGalenique>{
    return this.http.delete<FormeGalenique>(`${URL.BASE_URL}${URL.FORM_GENERIQUE_URL}/${form.id}`);
  }

  updateFormGalenique(form: FormeGalenique):Observable<FormeGalenique>{
    return this.http.patch<FormeGalenique>(`${URL.BASE_URL}${URL.FORM_GENERIQUE_URL}/${form.id}`, form);
  }

}
