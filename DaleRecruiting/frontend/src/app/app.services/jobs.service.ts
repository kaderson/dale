import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { environment } from 'src/environments/environment';

export interface SkillData {
    id_skill: number,
    skill: string
}
@Injectable({
    providedIn: 'root',
    }
)
export class JobsService {

    private fnBaseUrl = environment.baseUrl + 'skills';
    private serviceUrl = environment.baseUrl + 'skills';

    constructor(private auth: AuthService, private authGuard: AuthGuardService, private http: HttpClient) { }

    public addSkills(skill: SkillData) {
        const headers = this.auth.getHeaders(this.authGuard.canActivate());
        return this.http.post(this.serviceUrl, skill, {
            headers: headers
        });
    }

    public findAllSkills(): any {
        const headers = this.auth.getHeaders(this.authGuard.canActivate());
        return this.http.get(this.serviceUrl, {
            headers: headers
        });
    }

    public findOneSkills(id_skills) {
        const headers = this.auth.getHeaders(this.authGuard.canActivate());
        return this.http.get(`${this.serviceUrl}/${id_skills}`, {
            headers: headers
        });
    }

    public deleteSkills(id_skills) {
        const headers = this.auth.getHeaders(this.authGuard.canActivate());
        return this.http.delete(`${this.serviceUrl}/${id_skills}`, {
            headers: headers
        })
    }

    public updateSkill(id_skills, skill) {
        const headers = this.auth.getHeaders(this.authGuard.canActivate());
        return this.http.put(`${this.serviceUrl}/${id_skills}`, skill, {
            headers: headers,
            responseType: 'json'
        })
    }

    public findSkillsFn() {
        const headers = this.auth.getHeaders(false);
        return this.http.get(this.fnBaseUrl, {
            headers: headers,
            responseType: 'json'
        });
    }

}