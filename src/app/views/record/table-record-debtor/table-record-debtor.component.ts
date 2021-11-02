import { Wallet } from '../../../model/wallet.model';
import { RecordDebtor } from './../../../model/record-debtor.model';
import { DialogPaymentDebtorComponent } from './../dialog-payment-debtor/dialog-payment-debtor.component';
import { RecordService } from '../../../service/record.service';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WalletService } from '../../../service/wallet.service';
import { MessageService } from '../../../service/message.service';
import { DialogConfirmComponent } from 'src/app/shared/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-table-record-debtor',
  templateUrl: './table-record-debtor.component.html',
  styleUrls: ['./table-record-debtor.component.css']
})
export class TableRecordDebtorComponent implements OnInit {

  @Input()
  dataSource: {}[] = [];

  displayedColumns: string[] = ['deadline', 'title', 'valor', 'paid', 'actions'];

  wallet: Wallet = {};

  constructor(private walletService: WalletService,
    private recordService: RecordService,
    private messageService: MessageService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.wallet = this.walletService.wallet;
  }

  pay(recordDebtor: RecordDebtor) {
    this.recordService.recordPayment = recordDebtor;
    this.dialog.open(DialogPaymentDebtorComponent);
  }

  delete(record: RecordDebtor) {
    const confirmDialog = this.dialog.open(DialogConfirmComponent, {
      data: {
        title: 'Confirmação',
        message: 'Deseja realmente remover o débito ' + record.title + '?'
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true && record.registrationCode != undefined) {
        this.recordService.deleteDebtor(record.registrationCode).subscribe(response => {
          this.messageService.showMessage("Débito removido com sucesso.")
        })
      }
    });


    
  }
}
