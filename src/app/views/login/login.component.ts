import { MessageService } from './../../shared/message.service';
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

  loading: boolean = false;

  constructor(
    private accountService: AccountService, 
    private router: Router,
    private messageService: MessageService) { }

  ngOnInit(): void {
  }

  async onSubmit() {
    try {
      this.loading = true;
      window.localStorage.removeItem('token');
      const result = await this.accountService.login(this.login);
      this.router.navigate(['wallet']);
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.messageService.showMessage("Usuário ou senha inválido.", true);
    }
  }

}
