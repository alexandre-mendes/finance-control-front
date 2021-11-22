import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generic-home',
  templateUrl: './generic-home.component.html',
  styleUrls: ['./generic-home.component.css']
})
export class GenericHomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logout(): void {
    window.localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  home() {
    this.router.navigate(['wallet'])
  }
}
