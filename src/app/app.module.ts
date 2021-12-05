import {httpInterceptorProviders} from './http-interceptors/index';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatTreeModule} from '@angular/material/tree';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {LoginComponent} from './views/login/login.component';
import {FormsModule} from '@angular/forms';
import {CreateAccountComponent} from './views/create-account/create-account.component';
import {HttpClientModule} from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {GenericHomeComponent} from './views/generic-home/generic-home.component';
import {GenericLoginComponent} from './views/generic-login/generic-login.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {WalletComponent} from './views/wallet/wallet.component';
import {DialogWalletComponent} from './views/wallet/dialog-wallet/dialog-wallet.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {IConfig, NgxMaskModule} from 'ngx-mask';
import {DialogConfirmComponent} from './shared/dialog-confirm/dialog-confirm.component';
import {TagComponent} from './views/tag/tag.component';
import {DialogTagComponent} from './views/tag/dialog-tag/dialog-tag.component';
import {MenuComponent} from './views/generic-home/menu/menu.component';
import {DebitTransactionsComponent} from './views/debit-transactions/debit-transactions.component';
import {CreditTransactiosComponent} from './views/credit-transactions/credit-transactions.component';
import {TableDebitTransactionsComponent} from './views/debit-transactions/table-debit-transactions/table-debit-transactions.component';
import {DialogDebitTransactionsComponent} from './views/debit-transactions/dialog-debit-transactions/dialog-debit-transactions.component';
import {DialogDebitPaymentAllComponent} from './views/debit-transactions/dialog-debit-payment-all/dialog-debit-payment-all.component';
import {
  DialogCreditTransactionsComponent
} from './views/credit-transactions/dialog-credit-transactions/dialog-credit-transactions.component';
import {TableCreditTransactionsComponent} from './views/credit-transactions/table-credit-transactions/table-credit-transactions.component';
import {DialogCreditTransferComponent} from './views/credit-transactions/dialog-credit-transfer/dialog-credit-transfer.component';
import {DialogDebitPaymentOneComponent} from './views/debit-transactions/dialog-debit-payment-one/dialog-debit-payment-one.component';

const maskConfig: Partial<IConfig> = {
  validation: false,
};


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateAccountComponent,
    GenericHomeComponent,
    GenericLoginComponent,
    WalletComponent,
    DialogWalletComponent,
    DialogConfirmComponent,
    TagComponent,
    DialogTagComponent,
    MenuComponent,
    DebitTransactionsComponent,
    CreditTransactiosComponent,
    TableDebitTransactionsComponent,
    DialogDebitTransactionsComponent,
    DialogDebitPaymentAllComponent,
    DialogCreditTransactionsComponent,
    TableCreditTransactionsComponent,
    DialogCreditTransferComponent,
    DialogDebitPaymentOneComponent
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatGridListModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatTreeModule,
    MatPaginatorModule,
    NgxMaskModule.forRoot(maskConfig)
  ],
  providers: [
    httpInterceptorProviders,
    {provide: MAT_DATE_LOCALE, useValue: 'pt-GB'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
