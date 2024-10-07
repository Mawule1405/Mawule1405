import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SpecialitePharmaceutique } from '../../model/SpecialitePharmaceutique';
import {URL} from '../../model/URL';

@Injectable({
  providedIn: 'root'
})
export class SpecialityService {

  constructor(
    private http: HttpClient
  ) { }

  getAllProductsSpecialities():Observable<Array<SpecialitePharmaceutique>>{
    return this.http.get<Array<SpecialitePharmaceutique>>(`${URL.BASE_URL}${URL.SPECIALITY_URL}`);
  }

  saveSpeciality(speciality : SpecialitePharmaceutique): Observable<SpecialitePharmaceutique>{
    ;
    return this.http.post<SpecialitePharmaceutique>(`${URL.BASE_URL}${URL.SPECIALITY_URL}/${speciality.dci.id}`, speciality);
  }

  deleteSpeciality(speciality: SpecialitePharmaceutique){
    return this.http.delete(`${URL.BASE_URL}${URL.SPECIALITY_URL}/${speciality.id}`)
  }

  updateSpeciality(speciality: SpecialitePharmaceutique):Observable<SpecialitePharmaceutique>{
    alert(speciality)
    return this.http.put<SpecialitePharmaceutique>(`${URL.BASE_URL}${URL.SPECIALITY_URL}`, speciality);
  }

}


