import { RecordDebtor } from '../../../model/record-debtor.model';
import { RecordCreditor } from '../../../model/record-creditor.model';
import { WalletService } from '../../../service/wallet.service';
import { Wallet } from '../../../model/wallet.model';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../../../service/message.service';
import { RecordService } from '../../../service/record.service';

@Component({
  selector: 'app-dialog-transfer-creditor',
  templateUrl: './dialog-transfer-creditor.component.html',
  styleUrls: ['./dialog-transfer-creditor.component.css']
})
export class DialogTransferCreditorComponent implements OnInit {

  wallets: Wallet[] = [];
  walletOrigin: Wallet = {};
  walletDestiny: Wallet = {};
  valueTransfer?: number;
  monthCurrent: number = 0;

  constructor(private route: ActivatedRoute,
    private walletService: WalletService,
    private recordService: RecordService,
    private messageService: MessageService,
    private dialogRef: MatDialogRef<DialogTransferCreditorComponent>) { }

  ngOnInit(): void {
    this.walletService.listAllCreditor(this.recordService.monthSelected, this.recordService.yearSelected).subscribe(response => {
      this.wallets = response.content;
    });

    this.walletOrigin = this.walletService.wallet;
  }

  confirm() {
    if (this.walletOrigin.id != undefined 
      && this.walletOrigin.value != undefined
      && this.walletDestiny.id != undefined 
      && this.valueTransfer != undefined 
      && this.valueTransfer > 0) {

      this.recordService.transfer(this.walletOrigin.id, this.walletDestiny.id, this.valueTransfer).subscribe(() => {
        this.messageService.showMessage("Transferência efetuada com sucesso.")
        this.dialogRef.close();
      })
    } 
  }

}
