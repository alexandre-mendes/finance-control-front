import {WalletService} from '../../../service/wallet.service';
import {Wallet} from '../../../model/wallet.model';
import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {MessageService} from '../../../service/message.service';
import {RecordService} from '../../../service/record.service';
import {RecordCreditorService} from '../../../service/record-creditor.service';
import {Transfer} from '../../../model/transfer.model';
import {HttpParams} from '@angular/common/http';
import {TypeWallet} from '../../../model/type-wallet.enum';

@Component({
  selector: 'app-dialog-transfer-creditor',
  templateUrl: './dialog-credit-transfer.component.html',
  styleUrls: ['./dialog-credit-transfer.component.css']
})
export class DialogCreditTransferComponent implements OnInit {

  wallets: Wallet[] = [];
  transfer: Transfer = {};

  constructor(private route: ActivatedRoute,
              private walletService: WalletService,
              private recordCreditorService: RecordCreditorService,
              private messageService: MessageService,
              private dialogRef: MatDialogRef<DialogCreditTransferComponent>) { }

  ngOnInit(): void {
    this.listAllWallets();
  }

  private listAllWallets(): void {
    let params = new HttpParams();
    params = params.append('type-wallet', TypeWallet.ACTIVE);
    params = params.append('size', '100');
    params = params.append('page', '0');
    this.walletService.listAll(params).subscribe(response => {
      this.wallets.push(...response.content);
    });
  }

  confirm(): void {
    this.recordCreditorService.transfer(this.transfer).subscribe(() => {
      this.messageService.showMessage('Transferência efetuada com sucesso.');
      this.dialogRef.close();
    });
  }
}
