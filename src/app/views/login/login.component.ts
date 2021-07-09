import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login = {
    "username": "",
    "password": ""
  }

  constructor(
    private accountService: AccountService, 
    private router: Router) { }

  ngOnInit(): void {
  }

  async onSubmit() {
    try {
      window.localStorage.removeItem('token');
      const result = await this.accountService.login(this.login);
      console.log(`Login efetuado ${result}`);
      this.router.navigate(['wallet']);
    } catch (error) {
      console.error(error);
    }
  }

}
