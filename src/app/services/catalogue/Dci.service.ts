import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dci } from '../../model/Dci';
import {URL} from '../../model/URL';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DciService {
  url= URL.BASE_URL;

  constructor(private http: HttpClient) { }

  getAllDCIs():Observable<Array<Dci>>{
    return this.http.get<Array<Dci>>(`${URL.BASE_URL}${URL.DCI_URL}/`);
  }

  getDCI(id : string): Observable<Dci>{
    return this.http.get<Dci>(`${this.url}${URL.DCI_URL}/${id}`)
  }

  getOnePageOfDCI(page:number, size:number):Observable<Array<Dci>>{
    return this.http.get<Array<Dci>>(`${this.url}${URL.DCI_URL}?_page=${page}&_limit=${size}`);
  }

  saveDCI(dci: Dci):Observable<Dci>{
    let d = {nomDci: dci.nomDci, isDeleted : true};
    return this.http.post<Dci>(`${URL.BASE_URL}${URL.DCI_URL}`, d);
  }

  deleteDci(dci: Dci){
    return this.http.delete(`${URL.BASE_URL}${URL.DCI_URL}/${dci.id}`);
  }

  updateDci(dci: Dci){
    return this.http.patch(`${URL.BASE_URL}${URL.DCI_URL}/${dci.id}`,dci);
  }

}
