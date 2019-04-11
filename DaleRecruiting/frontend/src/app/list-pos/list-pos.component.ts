import { Component, OnInit } from '@angular/core';
import { JobsService } from '../app.services/jobs.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter'

@Component({
  selector: 'app-list-pos',
  templateUrl: './list-pos.component.html',
  styleUrls: ['./list-pos.component.css']
})
export class ListPosComponent implements OnInit {

  constructor(private jobService : JobsService) { }

  skills : Object;
  searchText : Ng2SearchPipeModule;

  ngOnInit() {
    this.findAllSkills();
  }

  findAllSkills() {
    this.jobService.findAllSkills().subscribe(
      skills => this.skills = skills
    )
  }

  deleteSkills(idSkills) {
    this.jobService.deleteSkills(idSkills).subscribe(
      ()=> this.findAllSkills()
    );
  }
}
