import { Month } from './../../shared/month.model';
import { WalletSummary } from './wallet-summary.model';
import { Component, OnInit } from '@angular/core';
import { DialogWalletComponent } from './dialog-wallet/dialog-wallet.component';
import {MatDialog} from '@angular/material/dialog';
import { WalletService } from './wallet.service';
import { Wallet } from './wallet.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  panelOpenState = false;
  walletsDebtor: Wallet[] = [];
  walletsCreditor: Wallet[] = [];
  walletSummary: WalletSummary = {};
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

  constructor(public dialog: MatDialog, 
    private walletService: WalletService,
    private router: Router) { }

  ngOnInit(): void {
    this.walletService.findCurrentMonth().subscribe(response => {
      this.monthSelected = this.months.filter(month => month.value == response)[0];

      this.walletService.findCurrentYear().subscribe(res => {
        this.yearSelected = res;
        this.findYears();
        this.findWalletsSummary();
        this.listAll();
      })
    })
    
    this.walletService.issueWalletCreated.subscribe(() => {
      this.listAll();
    })
  }

  async initialize() {
    
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogWalletComponent);
  }

  reloadWallets() {
    this.findWalletsSummary();
    this.listAll();
  }

  listAll() {
    this.walletService.listAll(this.monthSelected.value, this.yearSelected).subscribe(response => {
      console.log("Foi")
      this.walletsDebtor = response.content.filter(wallet => wallet.typeWallet === 'DEBTOR');
      this.walletsCreditor = response.content.filter(wallet => wallet.typeWallet === 'CREDITOR');
    })
  }

  findYears() {
    this.walletService.findYears().subscribe(res => {
      this.years = res.content;
    })
  }

  findWalletsSummary() {
    this.walletService.findWalletsSummary(this.monthSelected.value, this.yearSelected).subscribe(response => {
      this.walletSummary = response;
    })
  }

  redirectRecord(wallet: Wallet) {
    this.walletService.wallet = wallet;
    this.router.navigate([`wallet/record`]);
  }

}
