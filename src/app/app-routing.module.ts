import { GenericLoginComponent } from './views/generic-login/generic-login.component';
import { GenericHomeComponent } from './views/generic-home/generic-home.component';
import { LoginComponent } from './views/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountComponent } from './views/create-account/create-account.component';
import { AuthGuard } from './shared/auth.guard';
import { WalletComponent } from './views/wallet/wallet.component';
import { RecordComponent } from './views/record/record.component';
import { TagComponent } from './views/tag/tag.component';
import { DebitTransactionsComponent } from './views/debit-transactions/debit-transactions.component';
import { CreditTransactiosComponent } from './views/credit-transactions/credit-transactions.component';

const routes: Routes = [
  {
    path: '',
    component: GenericHomeComponent,
    children: [
      { path: 'wallet', component: WalletComponent },
      { path: 'wallet/record', component: RecordComponent },
      { path: 'tag', component: TagComponent },
      { path: 'debit-transactions', component: DebitTransactionsComponent },
      { path: 'credit-transactions', component: CreditTransactiosComponent}
    ],
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: GenericLoginComponent,
    children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login', component: LoginComponent},
      {path: 'create-account', component: CreateAccountComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
