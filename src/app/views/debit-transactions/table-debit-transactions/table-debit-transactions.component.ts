import {Wallet} from '../../../model/wallet.model';
import {RecordDebtor} from '../../../model/record-debtor.model';
import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {WalletService} from '../../../service/wallet.service';
import {MessageService} from '../../../service/message.service';
import {DialogConfirmComponent} from 'src/app/shared/dialog-confirm/dialog-confirm.component';
import {RecordDebtorService} from '../../../service/record-debtor.service';
import {DialogDebitPaymentOneComponent} from '../dialog-debit-payment-one/dialog-debit-payment-one.component';

@Component({
  selector: 'app-table-debit-transactions',
  templateUrl: './table-debit-transactions.component.html',
  styleUrls: ['./table-debit-transactions.component.css']
})
export class TableDebitTransactionsComponent implements OnInit {

  @Input()
  dataSource: {}[] = [];

  displayedColumns: string[] = ['deadline', 'title', 'valor', 'paid', 'actions'];

  wallet: Wallet = {};

  constructor(private walletService: WalletService,
              private recordDebtorService: RecordDebtorService,
              private messageService: MessageService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.wallet = this.walletService.wallet;
  }

  pay(recordDebtor: RecordDebtor): void {
    const dialog = this.dialog.open(DialogDebitPaymentOneComponent);
    dialog.componentInstance.paymentOne.recordDebtorId = recordDebtor.id;
  }

  delete(record: RecordDebtor): void {
    const confirmDialog = this.dialog.open(DialogConfirmComponent, {
      data: {
        title: 'Confirmação',
        message: 'Deseja realmente remover o débito ' + record.title + '?'
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true && record.registrationCode !== undefined) {
        this.recordDebtorService.delete(record.registrationCode).subscribe(() => {
          this.messageService.showMessage('Débito removido com sucesso.');
        });
      }
    });
  }
}
