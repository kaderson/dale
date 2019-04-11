import { Component, OnInit } from '@angular/core';
import { AnagraficaService } from '../app.services/anagrafica.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  

  constructor(private anagrService : AnagraficaService) { }

  anagraficas : Object;
  searchText : Ng2SearchPipeModule;

  ngOnInit() {
    this.findAllAnagr();
  }

  findAllAnagr() {
    this.anagrService.findAllAnagr().subscribe(
      anagraficas => this.anagraficas = anagraficas
    )
  }

  deleteAnagr(idAnagr) {
    this.anagrService.deleteAnagr(idAnagr).subscribe(
      ()=> this.findAllAnagr()
    );
  }

}
