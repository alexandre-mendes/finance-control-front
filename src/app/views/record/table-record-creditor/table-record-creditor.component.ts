import { DialogTransferCreditorComponent } from './../dialog-transfer-creditor/dialog-transfer-creditor.component';
import { RecordCreditor } from './../record-creditor.model';
import { Wallet } from './../../wallet/wallet.model';
import { RecordService } from './../record.service';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WalletService } from '../../wallet/wallet.service';


@Component({
  selector: 'app-table-record-creditor',
  templateUrl: './table-record-creditor.component.html',
  styleUrls: ['./table-record-creditor.component.css']
})
export class TableRecordCreditorComponent implements OnInit {

  @Input()
  dataSource: {}[] = [];

  displayedColumns: string[] = ['dateReceivement', 'title', 'valor', 'actions'];

  wallet: Wallet = {};

  constructor(private walletService: WalletService,
    private recordService: RecordService) { }

  ngOnInit(): void {
    this.wallet = this.walletService.wallet;
  }
}
