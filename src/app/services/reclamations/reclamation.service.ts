import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reclamation } from '../../model/Reclamation';
import {URL} from '../../model/URL';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  constructor(private http : HttpClient) { }

  getReclamationsNouvelles():Observable<Array<Reclamation>>{
    return this.http.get<Array<Reclamation>>(`${URL.BASE_URL}${URL.RECLAMATION_URL}?etatReclamation=NOUVEAU`)
  }

  getReclamationsLues():Observable<Array<Reclamation>>{
    return this.http.get<Array<Reclamation>>(`${URL.BASE_URL}${URL.RECLAMATION_URL}?etatReclamation=LU`)
  }

  getReclamationsArchivees():Observable<Array<Reclamation>>{
    return this.http.get<Array<Reclamation>>(`${URL.BASE_URL}${URL.RECLAMATION_URL}?etatReclamation=ARCHIVE`)
  }

  


}
