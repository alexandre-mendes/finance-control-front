import { Wallet } from '../../../model/wallet.model';
import { RecordService } from '../../../service/record.service';
import { Component, Input, OnInit } from '@angular/core';
import { WalletService } from '../../../service/wallet.service';
import { MessageService } from '../../../service/message.service';
import { DialogConfirmComponent } from 'src/app/shared/dialog-confirm/dialog-confirm.component';
import { MatDialog } from '@angular/material/dialog';
import { RecordCreditor } from '../../../model/record-creditor.model';
import {RecordCreditorService} from '../../../service/record-creditor.service';


@Component({
  selector: 'app-table-credit-transactions',
  templateUrl: './table-credit-transactions.component.html',
  styleUrls: ['./table-credit-transactions.component.css']
})
export class TableCreditTransactionsComponent implements OnInit {

  @Input()
  dataSource: {}[] = [];

  displayedColumns: string[] = ['dateTransaction', 'title', 'valor', 'actions'];

  wallet: Wallet = {};

  constructor(private walletService: WalletService,
              private recordCreditorService: RecordCreditorService,
              private messageService: MessageService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.wallet = this.walletService.wallet;
  }

  cancel(record: RecordCreditor): void {
    const confirmDialog = this.dialog.open(DialogConfirmComponent, {
      data: {
        title: 'Confirmação',
        message: 'Deseja realmente cancelar a transação ' + record.title + '?'
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true && record.id !== undefined) {
        this.recordCreditorService.cancelCreditor(record.id).subscribe(res => {
          this.messageService.showMessage('Cancelamento realizado com sucesso.');
        });
      }
    });
  }
}
