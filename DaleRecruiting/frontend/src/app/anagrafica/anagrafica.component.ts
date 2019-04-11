import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../app.services/auth.service';
import { AnagrData, AnagraficaService } from '../app.services/anagrafica.service';
import { JobsService } from '../app.services/jobs.service';
import { HomeComponent } from '../home/home.component'
import { RicercaService } from '../app.services/ricerca.service';

@Component({
  selector: 'app-anagrafica',
  templateUrl: './anagrafica.component.html',
  styleUrls: ['./anagrafica.component.css']
})
export class AnagraficaComponent implements OnInit {

  userForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private anagrService: AnagraficaService,
    private searchService: RicercaService
  ) { }

  jobs: any[] = []

  openPos() {
    this.searchService.openPos().subscribe(
      (jobs) => {
        for (let key of Object.values(jobs)) {
          this.jobs.push(key.tipo_posizione)
        }
      }
    )
  }

  anagrafica: AnagrData = {
    id_anagrafica: null,
    nome: '',
    cognome: '',
    email: '',
    age: null,
    cell: '',
    tipo_posizione: ''
  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.maxLength(30)]],
      cognome: ['', [Validators.required, Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      cell: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(65)]],
      tipo_posizione: [{ value: '', disabled: false }]
    });
    this.openPos();
  }

  get f() { return this.userForm.controls; }

  submit() {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    else if (!this.userForm.invalid) {
      this.anagrService.postAnagr(this.anagrafica).subscribe(
        () => {
          if (!this.auth.isLoggedIn()) {
            this.router.navigateByUrl('/greetings');
          }
        }
      )
    }
  }
}
