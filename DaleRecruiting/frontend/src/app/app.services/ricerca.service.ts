import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface SearchData {
  id_ricerca: number,
  data_ricerca: string,
  titolo: string,
  descrizione: string,
  descrizione_posizione: string,  
  recruiter: string,
  azienda_cliente: string,
  scadenza_ricerca: string,
  posizione_aperta: boolean,
  pubblica:any
}

@Injectable({
  providedIn: 'root'
})
export class RicercaService {

  private fnBaseUrl = environment.baseUrl + 'foreign/job';
  private serviceUrl = environment.baseUrl + 'ricerche';
  private serviceUrl2 = environment.baseUrl + 'foreign';
  

  constructor(private auth: AuthService, private authGuard: AuthGuardService, private http: HttpClient) { }

  public createRicerca(ricerca: SearchData) {
    const headers = this.auth.getHeaders(this.authGuard.canActivate());
    return this.http.post(`${this.serviceUrl}/ric`, ricerca, {
      headers: headers
    })
  }

  public findAllRicerca() {
    const headers = this.auth.getHeaders(this.authGuard.canActivate());
    return this.http.get(`${this.serviceUrl}/ric`, {
      headers: headers
    })
  }

  public deleteRicerca(id_ricerca) {
    const headers = this.auth.getHeaders(this.authGuard.canActivate());
    return this.http.delete(`${this.serviceUrl}/ric/${id_ricerca}`, {
      headers: headers
    })
  }

  public findOneRicerca(id_ricerca) {
    const headers = this.auth.getHeaders(this.authGuard.canActivate());
    return this.http.get(`${this.serviceUrl}/ric/${id_ricerca}`, {
      headers: headers
    })
  }

  public findOneRicercaId(id_ricerca) {
    return this.http.get(`${this.serviceUrl2}/ric/${id_ricerca}`, {
    })
  }

  public updateRicerca(id_ricerca, ricerca) {
    const headers = this.auth.getHeaders(this.authGuard.canActivate());
    return this.http.put(`${this.serviceUrl}/ric/${id_ricerca}`, ricerca, {
      headers: headers,
      responseType: 'json'
    })
  }

  public ricercaAnagr(id_ricerca, ricerca) {
    const headers = this.auth.getHeaders(this.authGuard.canActivate());
    return this.http.post(`${this.serviceUrl}/an/${id_ricerca}`, ricerca, {
      headers: headers
    })
  }

  public openPos() {
    const headers = this.auth.getHeaders(false);
    return this.http.get(this.fnBaseUrl, {
      headers: headers,
      responseType: 'json'
    });
  }
}
