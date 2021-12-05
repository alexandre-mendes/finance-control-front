import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogCreditTransactionsComponent} from './dialog-credit-transactions/dialog-credit-transactions.component';
import {RecordCreditorService} from '../../service/record-creditor.service';
import {HttpParams} from '@angular/common/http';
import {Wallet} from '../../model/wallet.model';
import {RecordCreditor} from '../../model/record-creditor.model';
import {TypeWallet} from '../../model/type-wallet.enum';
import {WalletService} from '../../service/wallet.service';
import {PageEvent} from '@angular/material/paginator';
import {MonthEnum} from '../../model/month.enum';
import {MessageService} from '../../service/message.service';
import {DialogCreditTransferComponent} from './dialog-credit-transfer/dialog-credit-transfer.component';

@Component({
    selector: 'app-credit-transactions',
    templateUrl: 'credit-transactions.component.html'
})
export class CreditTransactiosComponent implements OnInit {

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
  records: RecordCreditor[] = [];
  wallets: Wallet[] = [];
  wallet: Wallet = {};
  year = 0;
  month = 0;
  total = 0;

  constructor(public dialog: MatDialog,
              private messageService: MessageService,
              private recordCreditorService: RecordCreditorService,
              private  walletService: WalletService) { }

  ngOnInit(): void {
    const date = new Date();
    this.year = date.getFullYear();
    this.month = date.getMonth() + 1;
    this.findTotal();
    this.listAll();
    this.listAllWallets();
    this.recordCreditorService.listRecordsEvent.subscribe(() => {
      this.filter();
    });
  }

  openDialog(): void {
    if (this.wallet?.id === undefined) {
      this.messageService.showMessage('É necessário filtrar por uma carteira antes.', true);
    } else {
      const dialog = this.dialog.open(DialogCreditTransactionsComponent);
      dialog.componentInstance.record.wallet = this.wallet;
    }
  }

  openDialogTransfer(): void {
    if (this.wallet?.id === undefined) {
      this.messageService.showMessage('É necessário filtrar por uma carteira antes.', true);
    } else {
      const dialog = this.dialog.open(DialogCreditTransferComponent);
      dialog.componentInstance.transfer.walletOriginId = this.wallet.id;
    }
  }

  filter(): void {
    this.listAll();
    this.findTotal();
  }

  findTotal(): void {
    let params = new HttpParams();
    if (this.wallet.id !== undefined) {
      params = params.append('wallet-id', this.wallet?.id || '');
    }
    this.recordCreditorService.findTotal(params).subscribe(response => {
      this.total = response;
    });
  }

  listAll(): void {
    let params = new HttpParams();
    if (this.wallet.id !== undefined) {
      params = params.append('wallet-id', this.wallet.id || '');
    }
    params = params.append('month', this.month.toString());
    params = params.append('year', this.year.toString());
    params = params.append('size', this.pageSize?.toString());
    params = params.append('page', this.pageNumber?.toString());
    this.recordCreditorService.listAll(params).subscribe(response => {
      this.records = response.content;
      this.length = response.totalElements;
      this.pageNumber = response.number;
    });
  }

  private listAllWallets(): void {
    let params = new HttpParams();
    params = params.append('type-wallet', TypeWallet.ACTIVE);
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
