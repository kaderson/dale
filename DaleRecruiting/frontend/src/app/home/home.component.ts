import { Component, OnInit } from '@angular/core';
import { JobsService } from '../app.services/jobs.service';
import { RicercaService } from '../app.services/ricerca.service';
import { AuthService } from '../app.services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posizioni : Object;

  constructor(
    private search: RicercaService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    if(this.auth.isLoggedIn()){
      this.router.navigateByUrl('/anagrafica')
    };
    this.openPos()
  }

  openPos() {
    this.search.openPos().subscribe(
      posizioni => {
            this.posizioni = posizioni;
      }
    )}
}
