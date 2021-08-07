import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MessageService } from 'src/app/shared/message.service';
import { Wallet } from '../../wallet/wallet.model';
import { WalletService } from '../../wallet/wallet.service';
import { RecordService } from '../record.service';

@Component({
  selector: 'app-dialog-payment-all-debtor',
  templateUrl: './dialog-payment-all-debtor.component.html',
  styleUrls: ['./dialog-payment-all-debtor.component.css']
})
export class DialogPaymentAllDebtorComponent implements OnInit {

  wallets: Wallet[] = [];
  uuidWalletCreditor: string = "";
  uuidWalletDebtor: string = "";

  constructor(private walletService: WalletService,
    private recordService: RecordService,
    private messageService: MessageService,
    private dialogRef: MatDialogRef<DialogPaymentAllDebtorComponent>) { }

  ngOnInit(): void {
    this.uuidWalletDebtor = this.walletService.wallet.uuid != undefined ? this.walletService.wallet.uuid : "";

    this.walletService.listAllCreditor(this.recordService.monthSelected, this.recordService.yearSelected).subscribe(response => {
      this.wallets = response.content;
    });
  }

  confirm() {
    this.recordService.payAll(this.uuidWalletCreditor, this.uuidWalletDebtor).subscribe(res => {
      this.messageService.showMessage("Pagamento efetuado com sucesso.")
        this.dialogRef.close();
    })
  }

}
