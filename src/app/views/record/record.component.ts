import { DialogRecordCreditorComponent } from './dialog-record-creditor/dialog-record-creditor.component';
import { Wallet } from './../wallet/wallet.model';
import { RecordService } from './record.service';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material/tabs/tab-group';
import { WalletService } from '../wallet/wallet.service';
import { DialogRecordDebtorComponent } from './dialog-record-debtor/dialog-record-debtor.component';
import { Month } from 'src/app/shared/month.model';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {

  records: {}[] = []
  wallet: Wallet = {};
  monthSelected: Month = {label: "Janeiro", value: 1};
  months: Month[] = [
    {label: "Janeiro",  value: 1},
    {label: "Fevereiro",value: 2},
    {label: "Março",    value: 3},
    {label: "Abril",    value: 4},
    {label: "Maio",     value: 5},
    {label: "Junho",    value: 6},
    {label: "Julho",    value: 7},
    {label: "Agosto",   value: 8},
    {label: "Setembro", value: 9},
    {label: "Outubro",  value: 10},
    {label: "Novembro", value: 11},
    {label: "Dezembro", value: 12},
  ]

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
      this.monthSelected = this.months.filter(month => month.value == mesAtual)[0]
      this.recordService.monthSelected = mesAtual;

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
    this.recordService.listAllDebtor(this.wallet.uuid, this.monthSelected.value).subscribe(page => {
      this.records = page.content;
    })
  } 

  listAllCreditor() {
    this.recordService.listAllCreditor(this.wallet.uuid, this.monthSelected.value).subscribe(page => {
      this.records = page.content;
    })
  } 

  reloadRecords() {
    this.listAll();
    this.recordService.monthSelected = this.monthSelected.value;
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
