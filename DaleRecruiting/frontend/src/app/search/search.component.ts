import { Component, OnInit } from '@angular/core';
import { JobsService } from '../app.services/jobs.service';
import { AuthService } from '../app.services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RicercaService, SearchData } from '../app.services/ricerca.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchForm: FormGroup;
  submitted = false;

  constructor(
    private jobService: JobsService,
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private searchService: RicercaService
  ) { }

  jobs: any[] = []

  ricerca: SearchData = {
    id_ricerca: null,
    data_ricerca: '',
    titolo: '',
    descrizione: '',
    descrizione_posizione:'',
    recruiter: '',
    azienda_cliente: '',
    scadenza_ricerca: '',
    posizione_aperta: true,
    pubblica:''
  }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      data_ricerca: ['', [Validators.required]],
      titolo: ['', [Validators.required]],
      descrizione: ['', [Validators.required]],
      descrizione_posizione: ['', [Validators.required]],
      recruiter: ['', [Validators.required]],
      azienda_cliente: ['', [Validators.required]],
      scadenza_ricerca: ['', [Validators.required]],
      pubblica_offerta: ['']
    });
  }

  get s() { return this.searchForm.controls; }

  search() {
    this.submitted = true;
    if (this.searchForm.invalid) {
      return;
    }
    else if (!this.searchForm.invalid) {
      this.searchService.createRicerca(this.ricerca).subscribe(
        () => {
          if (this.auth.isLoggedIn()) {
            this.router.navigateByUrl('/ricerche');
          }
        }
      )
    }
  }
}
