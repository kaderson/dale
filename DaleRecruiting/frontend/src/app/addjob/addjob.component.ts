import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, RequiredValidator, Validators } from '@angular/forms';
import { JobsService, SkillData } from '../app.services/jobs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addjob',
  templateUrl: './addjob.component.html',
  styleUrls: ['./addjob.component.css']
})
export class AddjobComponent implements OnInit {

  jobForm: FormGroup;

  
  constructor(private job : JobsService, private formBuilder : FormBuilder, private router : Router) { }
 
  skills : SkillData= {
    id_skill: null,
    skill : ''
  }

  ngOnInit() {
    this.jobForm = this.formBuilder.group({
        skill: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)] ]
    })
  }

  get f() { return this.jobForm.controls; }

  addJob() {
    this.job.addSkills(this.skills).subscribe(
      () => {
        this.router.navigateByUrl('/skills');
      }
    )
  }
}
