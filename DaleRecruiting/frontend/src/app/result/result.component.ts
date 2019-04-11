import { Component, OnInit } from '@angular/core';
import { RicercaService } from '../app.services/ricerca.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../app.services/auth.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  searchText : Ng2SearchPipeModule;
  idRic: string;
  anagraficas: any[] = [];

  constructor(
    private router: Router,
    private auth: AuthService,
    private route: ActivatedRoute,
    private searchService: RicercaService
  ) { }

  ngOnInit() {
    this.idRic = this.route.snapshot.paramMap.get('idRic');
    if (this.idRic) {
      this.ricercaAnagr(this.idRic);
    }
  }

  ricercaAnagr(idRic) {
    this.searchService.findOneRicerca(idRic).subscribe(
      (result) => this.searchService.ricercaAnagr(idRic, result).subscribe(
        (anagraficas) => {
          for (let key of Object.values(anagraficas)) {
            this.anagraficas.push(key);
          }
        }
      )
    )
  }
}