import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-greetings',
  templateUrl: './greetings.component.html',
  styleUrls: ['./greetings.component.scss']
})
export class GreetingsComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 15000);
  }
}
