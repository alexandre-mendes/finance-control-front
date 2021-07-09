import { httpInterceptorProviders } from './http-interceptors/index';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import { LoginComponent } from './views/login/login.component';
import { FormsModule } from '@angular/forms';
import { CreateAccountComponent } from './views/create-account/create-account.component';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { GenericHomeComponent } from './views/generic-home/generic-home.component';
import { GenericLoginComponent } from './views/generic-login/generic-login.component';
import { FooterComponent } from './views/generic-home/footer/footer.component';
import { HeaderComponent } from './views/generic-home/header/header.component';
import { NavComponent } from './views/generic-home/nav/nav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { WalletComponent } from './views/wallet/wallet.component';
import { DialogWalletComponent } from './views/wallet/dialog-wallet/dialog-wallet.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RecordComponent } from './views/record/record.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTabsModule} from '@angular/material/tabs';
import { TableRecordComponent } from './views/record/table-record/table-record.component';
import {MatTableModule} from '@angular/material/table';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DialogRecordCreditorComponent } from './views/record/dialog-record-creditor/dialog-record-creditor.component';
import { DialogRecordDebtorComponent } from './views/record/dialog-record-debtor/dialog-record-debtor.component';
import { DialogPaymentDebtorComponent } from './views/record/dialog-payment-debtor/dialog-payment-debtor.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateAccountComponent,
    GenericHomeComponent,
    GenericLoginComponent,
    FooterComponent,
    HeaderComponent,
    NavComponent,
    WalletComponent,
    DialogWalletComponent,
    RecordComponent,
    TableRecordComponent,
    DialogRecordCreditorComponent,
    DialogRecordDebtorComponent,
    DialogPaymentDebtorComponent,
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
    MatNativeDateModule
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
