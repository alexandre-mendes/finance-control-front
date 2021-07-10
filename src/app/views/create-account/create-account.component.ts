import { AccountService } from 'src/app/shared/account.service';
import { MessageService } from './../../shared/message.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  login = {
    "name": "",
    "username": "",
    "password1": "",
    "password2": ""
  }

  activationCode: string = "";

  accountCreated: boolean = false;

  loading: boolean = false;

  constructor(
    private router: Router, 
    private messageService: MessageService,
    private accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.loadingEvent.subscribe(res => {
      this.loading = res;
    })
  }

  onSubmit() {
    if(this.isEmailValid(this.login.username)) {

      if(this.login.password1 === this.login.password2) {

        if(this.isPasswordValid(this.login.password1)) {
          
          this.loading = true;
          this.accountService.createUser({username:this.login.username, passwd: this.login.password1, name: this.login.name}).subscribe(res => {
            this.messageService.showMessage("Verifique o código enviado para o seu email.")
            this.accountCreated = true;
            this.loading = false;
          })
          

        } else {
          this.messageService.showMessage("A senha deve ter no minimo 8 caracteres.", true);
        }

      } else {
        this.messageService.showMessage("As senhas divergem.", true);
      }

    } else {
      this.messageService.showMessage("Digite um email válido.", true);
    }
  }

  activation() {
    this.accountService.userActivation({username: this.login.username, activationCode: this.activationCode}).subscribe(res => {
      this.loading = false;
      this.messageService.showMessage("Sua conta foi ativada com sucesso.");
      setInterval(() => this.back(), 4000);
    })
  }

  isEmailValid(email: string): boolean {
    var emailPattern =  /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    return emailPattern.test(email); 
  }

  isPasswordValid(password: string): boolean {
    return password.length >= 8;
  }

  back() {
    this.router.navigate(['login'])
  }
}
