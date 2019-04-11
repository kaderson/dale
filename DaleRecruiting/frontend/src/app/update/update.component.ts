import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../app.services/auth.service';
import { AnagraficaService, AnagrData } from '../app.services/anagrafica.service';
import { RicercaService } from '../app.services/ricerca.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  userForm: FormGroup;
  submitted = false;
  idAnagr: string;

  anagr : any = {
    id_anagrafica: null,
    nome: '',
    cognome: '',
    email: '',
    age: null,
    cell: '',
    tipo_posizione: ''
  } ;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private anagrService: AnagraficaService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      nome: [{value: '', disabled: true}],
      cognome: [{value: '', disabled: true}],
      email: [{value: '', disabled: true}],
      cell: [{value: '', disabled: true}],
      age: [{value: '', disabled: true}],
      tipo_posizione: [{value: '', disabled: true}],
      contattato: ['']
    });
    this.idAnagr = this.route.snapshot.paramMap.get('idAnagr');
    if (this.idAnagr) {
      this.findOneAnagr(this.idAnagr);
    }
  }

  get f() { return this.userForm.controls; }

  findOneAnagr(idAnagr) {
    this.anagrService.findOneAnagr(idAnagr).subscribe((anagr) => {
      if (anagr) {
        this.anagr = anagr;
      }
      else {
        this.router.navigate(['/anagrafica']);
      }
    })
  }

  submit() {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    else if (!this.userForm.invalid) {
      this.anagrService.updateAnagr(this.idAnagr, this.anagr).subscribe(
        () => {
          if (this.auth.isLoggedIn()) {
            this.router.navigateByUrl('/anagrafica');
          }
        }
      )
    }
  }
}
