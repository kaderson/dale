import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'

export interface AnagrData {
  id_anagrafica: number,
  nome: string,
  cognome: string,
  email: string,
  age: number,
  cell: string,
  tipo_posizione: any
}

@Injectable({
  providedIn: 'root'
})
export class AnagraficaService {

  private fnBaseUrl = environment.baseUrl + 'foreign/create'
  private serviceUrl = environment.baseUrl + 'candidati';

  constructor(private auth: AuthService, private authGuard: AuthGuardService, private http: HttpClient) { }

  public postAnagr(anagrafica: AnagrData) {
    const headers = this.auth.getHeaders(false);
    return this.http.post(this.fnBaseUrl, anagrafica, {
      headers: headers
    })
  }

  public findAllAnagr() {
    const headers = this.auth.getHeaders(this.authGuard.canActivate());
    return this.http.get(this.serviceUrl, {
      headers: headers
    })
  }

  public deleteAnagr(id_anagrafica) {
    const headers = this.auth.getHeaders(this.authGuard.canActivate());
    return this.http.delete(`${this.serviceUrl}/${id_anagrafica}`, {
      headers: headers
    })
  }

  public findOneAnagr(id_anagrafica) {
    const headers = this.auth.getHeaders(this.authGuard.canActivate());
    return this.http.get(`${this.serviceUrl}/${id_anagrafica}`, {
      headers: headers
    })
  }

  public updateAnagr(id_anagrafica, anagrafica) {
    const headers = this.auth.getHeaders(this.authGuard.canActivate());
    return this.http.put(`${this.serviceUrl}/${id_anagrafica}`, anagrafica, {
      headers: headers,
      responseType: 'json'
    })
  }
}
