import { RecordDebtor } from './../record-debtor.model';
import { RecordCreditor } from './../record-creditor.model';
import { WalletService } from './../../wallet/wallet.service';
import { Wallet } from './../../wallet/wallet.model';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/shared/message.service';
import { RecordService } from '../record.service';

@Component({
  selector: 'app-dialog-payment-debtor',
  templateUrl: './dialog-payment-debtor.component.html',
  styleUrls: ['./dialog-payment-debtor.component.css']
})
export class DialogPaymentDebtorComponent implements OnInit {

  wallets: Wallet[] = [];
  records: RecordCreditor[] = [];
  recordDebtor: RecordDebtor = {};
  uuidWallet: string = "";

  constructor(private route: ActivatedRoute,
    private walletService: WalletService,
    private recordService: RecordService,
    private messageService: MessageService,
    private dialogRef: MatDialogRef<DialogPaymentDebtorComponent>) { }

  ngOnInit(): void {
    this.walletService.listAllCreditor(this.recordService.monthSelected, this.recordService.yearSelected).subscribe(response => {
      this.wallets = response.content;
    });

    this.recordDebtor = this.recordService.recordPayment;
  }

  confirm() {
    if (this.recordDebtor.uuid != undefined) {
      this.recordService.pay(this.recordDebtor.uuid, this.uuidWallet).subscribe(() => {
        this.messageService.showMessage("Pagamento efetuado com sucesso.")
        this.dialogRef.close();
      })
    } 
  }
}
