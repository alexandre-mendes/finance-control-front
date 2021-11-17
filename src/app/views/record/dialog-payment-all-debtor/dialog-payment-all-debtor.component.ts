import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MessageService } from '../../../service/message.service';
import { Wallet } from '../../../model/wallet.model';
import { WalletService } from '../../../service/wallet.service';
import { RecordService } from '../../../service/record.service';

@Component({
  selector: 'app-dialog-payment-all-debtor',
  templateUrl: './dialog-payment-all-debtor.component.html',
  styleUrls: ['./dialog-payment-all-debtor.component.css']
})
export class DialogPaymentAllDebtorComponent implements OnInit {

  wallets: Wallet[] = [];
  walletCreditorId: string = "";
  walletDebtorId: string = "";

  constructor(private walletService: WalletService,
    private recordService: RecordService,
    private messageService: MessageService,
    private dialogRef: MatDialogRef<DialogPaymentAllDebtorComponent>) { }

  ngOnInit(): void {
    this.walletDebtorId = this.walletService.wallet.id != undefined ? this.walletService.wallet.id : "";

    this.walletService.listAllCreditor(this.recordService.monthSelected, this.recordService.yearSelected).subscribe(response => {
      this.wallets = response.content;
    });
  }

  confirm() {
    this.recordService.payAll(this.walletCreditorId, this.walletDebtorId).subscribe(res => {
      this.messageService.showMessage("Pagamento efetuado com sucesso.")
        this.dialogRef.close();
    })
  }

}
