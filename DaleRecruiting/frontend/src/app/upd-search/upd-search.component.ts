import { Component, OnInit } from '@angular/core';
import { RicercaService } from '../app.services/ricerca.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../app.services/auth.service';
import * as moment from 'moment';

@Component({
  selector: 'app-upd-search',
  templateUrl: './upd-search.component.html',
  styleUrls: ['./upd-search.component.css']
})
export class UpdSearchComponent implements OnInit {

  searchForm: FormGroup;
  ricerca: any = {
    id_ricerca: '',
    data_ricerca: '',
    titolo: '',
    descrizione: '',
    descrizione_posizione: '',
    recruiter: '',
    azienda_cliente: '',
    scadenza_ricerca: '',
    posizione_aperta: '',
  };
  submitted = false;
  idRic: string;

  constructor(
    private searchService: RicercaService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private auth: AuthService
  ) { }

  jobs: any[] = []

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      data_ricerca: ['', [Validators.required]],
      titolo: ['', [Validators.required]],
      descrizione: ['', [Validators.required]],
      descrizione_posizione: ['', [Validators.required]],
      recruiter: ['', [Validators.required]],
      azienda_cliente: ['', [Validators.required]],
      scadenza_ricerca: ['', [Validators.required]],
      posizione_aperta: ['']
    });
    this.idRic = this.route.snapshot.paramMap.get('idRic');
    if (this.idRic) {
      this.findOneRicerca(this.idRic);
    }
  }

  get s() { return this.searchForm.controls; }

  findOneRicerca(idRic) {
    this.searchService.findOneRicerca(idRic).subscribe((ricerca) => {
      if (ricerca) {
        this.ricerca = ricerca;
        if (ricerca['data_ricerca']) {
          this.ricerca['data_ricerca'] = moment(new Date(ricerca['data_ricerca'])).format("YYYY-MM-DD");
        }
        if (ricerca['scadenza_ricerca']) {
          this.ricerca['scadenza_ricerca'] = moment(new Date(ricerca['scadenza_ricerca'])).format("YYYY-MM-DD");
        }
      }
      else {
        this.router.navigate(['/search']);
      }
    })
  }

  submit() {
    this.submitted = true;
    if (this.searchForm.invalid) {
      return;
    }
    else if (!this.searchForm.invalid) {
      this.searchService.updateRicerca(this.idRic, this.ricerca).subscribe(
        () => {
          if (this.auth.isLoggedIn()) {
            this.router.navigateByUrl('/ricerche');
          }
        }
      )
    }
  }
}
