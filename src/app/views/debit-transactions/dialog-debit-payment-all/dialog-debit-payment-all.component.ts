import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MessageService } from '../../../service/message.service';
import { Wallet } from '../../../model/wallet.model';
import { WalletService } from '../../../service/wallet.service';
import { RecordService } from '../../../service/record.service';
import {PaymentAll} from '../../../model/payment-all.model';
import {RecordDebtorService} from '../../../service/record-debtor.service';
import {HttpParams} from '@angular/common/http';
import {TypeWallet} from '../../../model/type-wallet.enum';

@Component({
  selector: 'app-dialog-debit-payment-all',
  templateUrl: './dialog-debit-payment-all.component.html'
})
export class DialogDebitPaymentAllComponent implements OnInit {

  wallets: Wallet[] = [];
  paymentAll: PaymentAll = {};

  constructor(private walletService: WalletService,
              private recordDebtorService: RecordDebtorService,
              private messageService: MessageService,
              private dialogRef: MatDialogRef<DialogDebitPaymentAllComponent>) { }

  ngOnInit(): void {
    this.listAllWallets();
  }

  listAllWallets(): void {
    let params = new HttpParams();
    params = params.append('type-wallet', TypeWallet.ACTIVE);
    params = params.append('size', '100');
    params = params.append('page', '0');
    this.walletService.listAll(params).subscribe(response => {
      this.wallets = response.content;
    });
  }

  confirm(): void {
    this.recordDebtorService.payAll(this.paymentAll).subscribe(res => {
      this.messageService.showMessage('Pagamento efetuado com sucesso.');
      this.dialogRef.close();
    });
  }
}
