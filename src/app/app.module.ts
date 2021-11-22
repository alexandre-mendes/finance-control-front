import { httpInterceptorProviders } from './http-interceptors/index';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import {MatTreeModule} from '@angular/material/tree';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { LoginComponent } from './views/login/login.component';
import { FormsModule } from '@angular/forms';
import { CreateAccountComponent } from './views/create-account/create-account.component';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { GenericHomeComponent } from './views/generic-home/generic-home.component';
import { GenericLoginComponent } from './views/generic-login/generic-login.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { WalletComponent } from './views/wallet/wallet.component';
import { DialogWalletComponent } from './views/wallet/dialog-wallet/dialog-wallet.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RecordComponent } from './views/record/record.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { DialogRecordCreditorComponent } from './views/record/dialog-record-creditor/dialog-record-creditor.component';
import { DialogRecordDebtorComponent } from './views/record/dialog-record-debtor/dialog-record-debtor.component';
import { DialogPaymentDebtorComponent } from './views/record/dialog-payment-debtor/dialog-payment-debtor.component';
import { DialogTransferCreditorComponent } from './views/record/dialog-transfer-creditor/dialog-transfer-creditor.component';
import { TableRecordDebtorComponent } from './views/record/table-record-debtor/table-record-debtor.component';
import { TableRecordCreditorComponent } from './views/record/table-record-creditor/table-record-creditor.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { DialogConfirmComponent } from './shared/dialog-confirm/dialog-confirm.component';
import { DialogPaymentAllDebtorComponent } from './views/record/dialog-payment-all-debtor/dialog-payment-all-debtor.component';
import { TagComponent } from './views/tag/tag.component';
import { DialogTagComponent } from './views/tag/dialog-tag/dialog-tag.component';
import { MenuComponent } from './views/generic-home/menu/menu.component';
import { DebitTransactionsComponent } from './views/debit-transactions/debit-transactions.component';
import { CreditTransactiosComponent } from './views/credit-transactions/credit-transactions.component';

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
    RecordComponent,
    DialogRecordCreditorComponent,
    DialogRecordDebtorComponent,
    DialogPaymentDebtorComponent,
    DialogTransferCreditorComponent,
    TableRecordDebtorComponent,
    TableRecordCreditorComponent,
    DialogConfirmComponent,
    DialogPaymentAllDebtorComponent,
    TagComponent,
    DialogTagComponent,
    MenuComponent,
    DebitTransactionsComponent,
    CreditTransactiosComponent
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
    NgxMaskModule.forRoot(maskConfig)
  ],
  providers: [
    httpInterceptorProviders,
    {provide: MAT_DATE_LOCALE, useValue: 'pt-GB'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
