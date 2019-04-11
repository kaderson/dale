import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

export interface UserDetails {
    id_utente: number,
    username: string,
    password: string,
    nome: string,
    cognome: string,
    exp: number,
    iat: number
}

interface TokenResponse {
    token: string
}

export interface TokenPayLoad {
    id_utente: number,
    username: string,
    password: string
}

@Injectable()
export class AuthService {
    public token: string

    constructor(private http: HttpClient, private router: Router) { }

    private serviceUrl = environment.baseUrl + 'utente/login';

    public saveToken(token: string): void {
        sessionStorage.setItem('userToken', token);
        this.token = token;
    }

    public getToken(): string {
        if (!this.token) {
            this.token = sessionStorage.getItem('userToken');
        }
        return this.token;
    }

    public getHeaders(useToken: boolean) {
        if (useToken == true) {
            const headerJson = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': this.getToken()
            };
            const headers = new HttpHeaders(headerJson);
            return headers;
        }
        else if(useToken == false) {
            const headerJson = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
            };
            const headers = new HttpHeaders(headerJson);
            return headers;
        }
    }

    public getUserDetails(): UserDetails {
        const token = this.getToken();
        let payLoad;
        if (token) {
            payLoad = token.split('.')[1];
            payLoad = window.atob(payLoad);
            return JSON.parse(payLoad);
        }
        else {
            return null;
        }
    }

    public isLoggedIn(): boolean {
        const user = this.getUserDetails();
        if (user) {
            return user.exp > Date.now() / 1000;
        }
        else {
            return false;
        }
    }

    public login(user: TokenPayLoad): Observable<any> {
        const base = this.http.post(this.serviceUrl, user);
        const request = base.pipe(
            map((data: TokenResponse) => {
                if (data.token) {
                    this.saveToken(data.token);
                }
            })
        )
        return request;
    }

    public logout(): void {
        this.token = '';
        window.sessionStorage.removeItem('userToken');
        this.router.navigateByUrl('/');
    }
}
