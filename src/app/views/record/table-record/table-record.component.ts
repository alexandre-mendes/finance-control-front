import { Wallet } from './../../wallet/wallet.model';
import { RecordDebtor } from './../record-debtor.model';
import { DialogPaymentDebtorComponent } from './../dialog-payment-debtor/dialog-payment-debtor.component';
import { RecordService } from './../record.service';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WalletService } from '../../wallet/wallet.service';


@Component({
  selector: 'app-table-record',
  templateUrl: './table-record.component.html',
  styleUrls: ['./table-record.component.css']
})
export class TableRecordComponent implements OnInit {

  @Input()
  dataSource: {}[] = [];

  displayedColumns: string[] = ['deadline', 'title', 'valor', 'paid', 'actions'];

  wallet: Wallet = {};

  constructor(private walletService: WalletService,
    private recordService: RecordService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.wallet = this.walletService.wallet;
  }

  pay(recordDebtor: RecordDebtor) {
    this.recordService.recordPayment = recordDebtor;
    this.dialog.open(DialogPaymentDebtorComponent);
  }

  isCreditor(): boolean {
    if(this.wallet.typeWallet === 'CREDITOR') {
      return true;
    }
    return false;
  }
}
