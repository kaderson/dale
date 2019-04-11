import { Component, OnInit, ViewChild } from '@angular/core';
import { RicercaService } from '../app.services/ricerca.service';
import { JobsService } from '../app.services/jobs.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {

  constructor(private searchService: RicercaService) { }

  searchText : Ng2SearchPipeModule;
  result: any
  ricercas: Object;

  ngOnInit() {
    this.findAllRicerca();
  }

  findAllRicerca() {
    this.searchService.findAllRicerca().subscribe(
      ricercas => this.ricercas = ricercas
    )
  }

  deleteRicerca(idRic) {
    this.searchService.deleteRicerca(idRic).subscribe(
      () => this.findAllRicerca()
    );
  }

  update(idRic, ricercas) {
    this.searchService.updateRicerca(idRic, ricercas).subscribe(
      () => this.findAllRicerca()
    )
  }
}
