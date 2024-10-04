import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MouvementStock} from "../../model/MouvementStock";
import {Observable} from "rxjs";
import {URL} from "../../model/URL";

@Injectable({
  providedIn: 'root'
})
export class MouvementStockService {

  constructor(private http: HttpClient) { }

  save(mouvement: MouvementStock): Observable<MouvementStock>{
    return this.http.post<MouvementStock>(`${URL.BASE_URL}${URL.MOUVEVEMENT_STOCK_URL}`, mouvement)
  }

  getAll(): Observable<Array<MouvementStock>>{
    return this.http.get<Array<MouvementStock>>(`${URL.BASE_URL}${URL.MOUVEVEMENT_STOCK_URL}`)
  }
}
