import { WalletService } from './../../wallet/wallet.service';
import { Wallet } from './../../wallet/wallet.model';
import { RecordCreditor } from './../record-creditor.model';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/shared/message.service';
import { RecordService } from '../record.service';

@Component({
  selector: 'app-dialog-record-creditor',
  templateUrl: './dialog-record-creditor.component.html',
  styleUrls: ['./dialog-record-creditor.component.css']
})
export class DialogRecordCreditorComponent implements OnInit {

  record: RecordCreditor = {};

  dayWallet?: number = undefined;

  constructor(private route: ActivatedRoute,
    private recordService: RecordService,
    private messageService: MessageService,
    private dialogRef: MatDialogRef<DialogRecordCreditorComponent>,
    private walletService: WalletService) { }

  ngOnInit(): void {
    let date = new Date();
    date.setDate(this.walletService.wallet.dayWallet || 1)
    date.setMonth(this.recordService.monthSelected)
    this.record.dateTransaction = date;

    this.dayWallet = this.walletService.wallet.dayWallet;
  }

  save() {
    this.recordService.create(this.record).subscribe(() => {
      this.messageService.showMessage("Registro salvo com sucesso.")
      this.dialogRef.close();
    })
  }
}
