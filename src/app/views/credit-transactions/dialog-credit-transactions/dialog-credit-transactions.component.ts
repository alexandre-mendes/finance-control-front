import {WalletService} from '../../../service/wallet.service';
import {RecordCreditor} from '../../../model/record-creditor.model';
import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {MessageService} from '../../../service/message.service';
import {RecordService} from '../../../service/record.service';
import {Wallet} from '../../../model/wallet.model';
import {RecordCreditorService} from '../../../service/record-creditor.service';

@Component({
  selector: 'app-dialog-record-creditor',
  templateUrl: './dialog-credit-transactions.component.html',
  styleUrls: ['./dialog-credit-transactions.component.css']
})
export class DialogCreditTransactionsComponent implements OnInit {

  record: RecordCreditor = {};
  wallet: Wallet = {};
  dayWallet?: number = undefined;

  constructor(private route: ActivatedRoute,
              private recordCreditorService: RecordCreditorService,
              private messageService: MessageService,
              private dialogRef: MatDialogRef<DialogCreditTransactionsComponent>,
              private walletService: WalletService) { }

  ngOnInit(): void {
    const date = new Date();
    this.record.dateTransaction = date;
  }

  save(): void {
    console.log('AAQUI', this.record.wallet);
    this.recordCreditorService.create(this.record).subscribe(() => {
      this.messageService.showMessage('Registro salvo com sucesso.');
      this.dialogRef.close();
    });
  }
}
