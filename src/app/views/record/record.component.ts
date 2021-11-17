import { DialogTransferCreditorComponent } from './dialog-transfer-creditor/dialog-transfer-creditor.component';
import { DialogRecordCreditorComponent } from './dialog-record-creditor/dialog-record-creditor.component';
import { Wallet } from '../../model/wallet.model';
import { RecordService } from '../../service/record.service';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material/tabs/tab-group';
import { WalletService } from '../../service/wallet.service';
import { DialogRecordDebtorComponent } from './dialog-record-debtor/dialog-record-debtor.component';
import { Month } from '../../model/month.model';
import { DialogPaymentAllDebtorComponent } from './dialog-payment-all-debtor/dialog-payment-all-debtor.component';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {

  records: {value?: number, paid?: boolean}[] = []
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
  yearSelected: number = 0;
  years: number[] = [];
  totalCreditor?: number = 0;
  totalDebtor?: number = 0;

  constructor( 
    private recordService: RecordService,
    private walletService: WalletService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.initialize();
    this.recordService.updateRecords.subscribe(() => {
      this.listAll();
    })
  }

  async initialize() {
    this.wallet = this.walletService.wallet;

    this.monthSelected = this.months.filter(month => month.value == this.walletService.monthSelected?.value)[0]
    this.yearSelected = this.walletService.yearSelected != undefined ? this.walletService.yearSelected : 0;

    this.findYears()
    this.listAll();
  }

  listAll() {
    this.recordService.monthSelected = this.monthSelected.value;
    this.recordService.yearSelected = this.yearSelected;
    this.walletService.findWalletsSummary(this.monthSelected.value, this.yearSelected).subscribe(res => {
      this.totalCreditor = res.totalCreditor;
    })

    if(this.wallet.typeWallet === "DEBTOR") {
      this.listAllDebtor();
    } else {
      this.listAllCreditor();
    }
  }

  listAllDebtor() {
    this.recordService.listAllDebtor(this.wallet.id).subscribe(page => {
      this.records = page.content;
      this.totalDebtor = this.records.length > 0 ? this.records.filter(record => !record.paid)
        .map(record => record.value)
        .reduce((acumulator, currentValue) => (acumulator != undefined ? acumulator : 0) + (currentValue != undefined ? currentValue : 0)) : 0;
    })
  } 

  listAllCreditor() {
    this.recordService.listAllCreditor(this.wallet.id).subscribe(page => {
      this.records = page.content;
    })
  } 

  reloadRecords() {
    this.recordService.monthSelected = this.monthSelected.value;
    this.recordService.yearSelected = this.yearSelected
    this.listAll();
  }

  findYears() {
    this.walletService.findYears().subscribe(res => {
      this.years = res.content;
    })
  }

  openDialog() {
    this.recordService.wallet = this.wallet;

    if(this.wallet.typeWallet === "DEBTOR") {
      this.dialog.open(DialogRecordDebtorComponent);
    } else {
      this.dialog.open(DialogRecordCreditorComponent);
    }
  }

  openDialogPayment() {
    this.dialog.open(DialogPaymentAllDebtorComponent);
  }
  
  transfer() {
    this.dialog.open(DialogTransferCreditorComponent);
  }
}
