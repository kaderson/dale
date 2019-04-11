import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobsService } from '../app.services/jobs.service';
import { AuthService } from '../app.services/auth.service';

@Component({
  selector: 'app-upd-pos',
  templateUrl: './upd-pos.component.html',
  styleUrls: ['./upd-pos.component.css']
})
export class UpdPosComponent implements OnInit {

  submitted = false;
  jobForm: FormGroup;
  idPos: string;
  posiz : any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private jobService: JobsService,
    private router: Router,
    private auth : AuthService
  ) { }

  ngOnInit() {
    this.jobForm = this.formBuilder.group({
      tipo_posizione: [''],
      inserzione: ['']
    });
    this.idPos = this.route.snapshot.paramMap.get('idSkill');
    if (this.idPos) {
      this.findOnePosizione(this.idPos);
    }
  }

  findOnePosizione(idPos) {
    this.jobService.findOneSkills(idPos).subscribe((posiz) => {
      if (posiz) {
        this.posiz = posiz;
      }
      else {
        this.router.navigate(['/pos']);
      }
    })
  }

  updateJob() {
    this.submitted = true;
    if (!this.jobForm.invalid) {
      this.jobService.updateSkill(this.idPos, this.posiz).subscribe(
        () => {
          if (this.auth.isLoggedIn()) {
            this.router.navigateByUrl('/pos');
          }
        }
      )
    }
  }
}
