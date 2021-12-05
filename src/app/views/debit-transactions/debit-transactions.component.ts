import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MonthEnum } from 'src/app/model/month.enum';
import { TypeWallet } from 'src/app/model/type-wallet.enum';
import { Wallet } from 'src/app/model/wallet.model';
import { RecordDebtorService } from 'src/app/service/record-debtor.service';
import { WalletService } from 'src/app/service/wallet.service';
import { DialogDebitPaymentAllComponent } from './dialog-debit-payment-all/dialog-debit-payment-all.component';
import { DialogDebitTransactionsComponent } from './dialog-debit-transactions/dialog-debit-transactions.component';
import {MessageService} from '../../service/message.service';

@Component({
    selector: 'app-debit-transactions',
    templateUrl: 'debit-transactions.component.html'
})
export class DebitTransactionsComponent implements OnInit {

  length = 100;
  pageSize = 10;
  pageNumber = 0;

  months: MonthEnum[] = [
    MonthEnum.JANUARY,
    MonthEnum.FEBRUARY,
    MonthEnum.MARCH,
    MonthEnum.APRIL,
    MonthEnum.MAY,
    MonthEnum.JUNE,
    MonthEnum.JULY,
    MonthEnum.AUGUST,
    MonthEnum.SEPTEMBER,
    MonthEnum.OCTOBER,
    MonthEnum.NOVEMBER,
    MonthEnum.DECEMBER
  ];

  years: number[] = [
    2021,
    2022,
    2023,
    2024,
    2025,
    2026,
    2027,
    2028,
    2029,
    2030
  ];

  wallets: Wallet[] = [];

  debtors: {value?: number, paid?: boolean}[] = [{value: 100, paid: false}];

  year = 2020;

  month: MonthEnum = MonthEnum.JANUARY;

  wallet?: Wallet;

  constructor(
    public dialog: MatDialog,
    private service: RecordDebtorService,
    private walletService: WalletService,
    private messageService: MessageService) {}

  ngOnInit(): void {
    const date = new Date();
    this.month = date.getMonth() + 1;
    this.year = date.getFullYear();

    this.listAllWallets();
    this.listAll();

    this.service.listRecordsEvent.subscribe(() => {
      this.listAll();
    });
  }

  openDialog(): void {
    this.dialog.open(DialogDebitTransactionsComponent);
  }

  openDialogPayment(): void {
    if (this.wallet?.id === undefined) {
      this.messageService.showMessage('É necessário filtrar por uma carteira antes.', true);
    } else {
      const dialog = this.dialog.open(DialogDebitPaymentAllComponent);
      dialog.componentInstance.paymentAll = {walletDebtorId: this.wallet?.id, year: this.year, month: this.month};
    }
  }

  listAll(): void {
    let params = new HttpParams();
    if (this.wallet?.id !== undefined) {
      params = params.append('wallet-id', this.wallet.id || '');
    }
    params = params.append('month', this.month?.toString());
    params = params.append('year', this.year?.toString());
    params = params.append('size', this.pageSize?.toString());
    params = params.append('page', this.pageNumber?.toString());

    this.service.listAll(params).subscribe(response => {
      this.debtors = response.content;
      this.length = response.totalElements;
      this.pageNumber = response.number;
    });
  }

  listAllWallets(): void {
    let params = new HttpParams();
    params = params.append('type-wallet', TypeWallet.DEBTOR);
    params = params.append('size', '100');
    params = params.append('page', '0');
    this.walletService.listAll(params).subscribe(response => {
        this.wallets.push({title: 'TODAS'});
        this.wallets.push(...response.content);
        this.wallet = this.wallets[0];
    });
  }

  pageChangeEvent(event: PageEvent): void {
    this.listAll();
  }
}
