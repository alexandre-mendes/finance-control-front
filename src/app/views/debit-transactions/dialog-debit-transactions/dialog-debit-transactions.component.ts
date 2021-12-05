import {WalletService} from '../../../service/wallet.service';
import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {MessageService} from '../../../service/message.service';
import {RecordDebtor} from '../../../model/record-debtor.model';
import {TagService} from 'src/app/service/tag.service';
import {Tag} from 'src/app/model/tag.model';
import {HttpParams} from '@angular/common/http';
import {Wallet} from '../../../model/wallet.model';
import {RecordDebtorService} from '../../../service/record-debtor.service';

@Component({
  selector: 'app-dialog-debit-transactions',
  templateUrl: './dialog-debit-transactions.component.html',
  styleUrls: ['./dialog-debit-transactions.component.css']
})
export class DialogDebitTransactionsComponent implements OnInit {

  record: RecordDebtor = {installments: 1};
  tags: Tag[] = [];
  wallets: Wallet[] = [];

  constructor(private route: ActivatedRoute,
              private recordDebtorService: RecordDebtorService,
              private tagService: TagService,
              private messageService: MessageService,
              private dialogRef: MatDialogRef<DialogDebitTransactionsComponent>,
              private walletService: WalletService) { }

  ngOnInit(): void {
    this.record.dateDeadline = new Date();
    this.listTags();
    this.listWallets();
  }

  save(): void {
    this.recordDebtorService.create(this.record).subscribe(() => {
      this.messageService.showMessage('Registro salvo com sucesso.');
      this.recordDebtorService.listRecordsEvent.emit('');
      this.dialogRef.close();
    });
  }

  onSelectWallet(wallet: Wallet): void {
    const date = new Date();
    date.setMonth(date.getMonth() + 1, wallet.dayWallet);
    this.record.dateDeadline = date;
  }

  private listTags(): void {
    let params = new HttpParams();
    params = params.append('size', '100');
    params = params.append('page', '0');
    this.tagService.listAll(params).subscribe(response => {
      this.tags = response.content;
    });
  }

  private listWallets(): void {
    let params = new HttpParams();
    params = params.append('size', '100');
    params = params.append('page', '0');
    this.walletService.listAll(params).subscribe(response => {
      this.wallets = response.content;
    });
  }
}
