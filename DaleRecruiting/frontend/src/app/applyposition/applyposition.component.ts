import { Component, OnInit } from '@angular/core';
import { RicercaService } from '../app.services/ricerca.service';
import { AuthService } from '../app.services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AnagrData, AnagraficaService } from '../app.services/anagrafica.service';


@Component({
  selector: 'app-applyposition',
  templateUrl: './applyposition.component.html',
  styleUrls: ['./applyposition.component.css']
})
export class ApplypositionComponent implements OnInit {
  posizione_descrizione: Object = {};
  userForm: FormGroup;
  submitted = false;

  constructor(
    private search: RicercaService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private anagrService: AnagraficaService


  ) { }
  
  ricId:String;
  ngOnInit() {
    this.ricId=this.route.snapshot.paramMap.get('idRic');
    if(this.ricId)
      this.openPos(this.ricId);

    if(this.auth.isLoggedIn()){
      this.router.navigateByUrl('/anagrafica')
    };

    this.userForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.maxLength(30)]],
      cognome: ['', [Validators.required, Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      cell: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(65)]],
      tipo_posizione: [{ value: '', disabled: false }]
    });
  
  }

  openPos(id) {
    this.search.findOneRicercaId(id).subscribe(
      posizioni => {
            this.posizione_descrizione = posizioni;
      }
    )}

    anagrafica: AnagrData = {
      id_anagrafica: null,
      nome: '',
      cognome: '',
      email: '',
      age: null,
      cell: '',
      tipo_posizione: ''
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
            this.router.navigateByUrl('/home');
          }
       
      )
    }
  }

}
