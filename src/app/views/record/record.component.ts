import { DialogRecordCreditorComponent } from './dialog-record-creditor/dialog-record-creditor.component';
import { Wallet } from './../wallet/wallet.model';
import { RecordService } from './record.service';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material/tabs/tab-group';
import { WalletService } from '../wallet/wallet.service';
import { DialogRecordDebtorComponent } from './dialog-record-debtor/dialog-record-debtor.component';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {

  records: {}[] = []
  tabMesSeelecionada: number = 0;
  wallet: Wallet = {};

  constructor(public dialogDebtor: MatDialog,
    public dialogCreditor: MatDialog, 
    private recordService: RecordService,
    private walletService: WalletService) { }

  ngOnInit(): void {
    this.initialize();
    this.recordService.updateRecords.subscribe(() => {
      this.listAll();
    })
  }

  async initialize() {
    this.wallet = this.walletService.wallet;
    console.log("INITIALIZE ", this.wallet)
    this.recordService.findCurrentMonth().subscribe(mesAtual => {
      this.tabMesSeelecionada = mesAtual - 1;

      this.listAll();
    })
  }

  listAll() {
    if(this.wallet.typeWallet === "DEBTOR") {
      this.listAllDebtor();
    } else {
      this.listAllCreditor();
    }
  }

  listAllDebtor() {
    this.recordService.listAllDebtor(this.wallet.uuid, this.tabMesSeelecionada + 1).subscribe(page => {
      this.records = page.content;
    })
  } 

  listAllCreditor() {
    this.recordService.listAllCreditor(this.wallet.uuid, this.tabMesSeelecionada + 1).subscribe(page => {
      this.records = page.content;
    })
  } 

  loadRecordMonth(event: MatTabChangeEvent) {
    this.records = [];
    this.listAll();
  }

  openDialog() {
    this.recordService.wallet = this.wallet;

    if(this.wallet.typeWallet === "DEBTOR") {
      this.dialogDebtor.open(DialogRecordDebtorComponent);
    } else {
      this.dialogCreditor.open(DialogRecordCreditorComponent);
    }
  }
  
}
