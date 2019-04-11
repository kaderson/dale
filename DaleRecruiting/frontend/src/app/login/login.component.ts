import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, TokenPayLoad } from '../app.services/auth.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  submitted = false;
  errorMessage = "";

  credentials: TokenPayLoad = {
    id_utente: 0,
    username: '',
    password: ''
  }

  constructor(private auth: AuthService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    if(this.auth.isLoggedIn()){
      this.router.navigateByUrl('/candidati')
    }
    this.loginForm = this.formBuilder.group({
      username : ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  get control() {
    return this.loginForm.controls;
  }
  
  login() {
    this.submitted = true;
    this.auth.login(this.credentials).subscribe(
      () => {
        this.router.navigateByUrl('/candidati');
      },
      error => {
        this.errorMessage = "Credenziali non corrette, riprova!";
        console.error(error);
      }
    )
  }
}

