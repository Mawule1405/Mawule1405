import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {URL} from '../../model/URL';

import { forkJoin, Observable } from 'rxjs';
import { Client } from '../../model/Client';
import { Agent } from '../../model/Agent';
@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  constructor(private http: HttpClient) { }

  getClientProfil():Observable<Array<Client>> {
    return  this.http.get<Array<Client>>(`${URL.BASE_URL}${URL.CLIENT_PROFIL_URL}`);
    
  }

  getAgentProfil():Observable<Array<Agent>>{
    return this.http.get<Array<Agent>>(`${URL.BASE_URL}${URL.AGENT_PROFIL_URL}`);
  
  }

  searchClientProfil(credential: any):Observable<Client> {
    return  this.http.get<Client>(`${URL.BASE_URL}${URL.CLIENT_PROFIL_URL}?nomUtilisateur=${credential.identifiant}&motDePasse=${credential.motDePasse}`);
    
  }

  searchAgentProfil(credential:any):Observable<Agent>{
    return this.http.get<Agent>(`${URL.BASE_URL}${URL.AGENT_PROFIL_URL}?nomUtilisateur=${credential.identifiant}&motDePasse=${credential.motDePasse}`);
  
  }

  updateClientProfil(client: Client):Observable<Client>{
    client.estOperationnel = !client.estOperationnel;
    return this.http.patch<Client>(`${URL.BASE_URL}${URL.CLIENT_PROFIL_URL}/${client.id}`, client);
  }
  
  
}
