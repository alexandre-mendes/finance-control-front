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

  constructor(public dialog: MatDialog, 
    private walletService: WalletService,
    private router: Router) { }

  ngOnInit(): void {
    this.walletService.findCurrentMonth().subscribe(response => {
      this.monthSelected = this.months.filter(month => month.value === response)[0];
      this.findWalletsSummary();
      this.listAll();
    })
    
    this.walletService.issueWalletCreated.subscribe(() => {
      this.listAll();
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogWalletComponent);
  }

  reloadWallets() {
    this.findWalletsSummary();
    this.listAll();
  }

  listAll() {
    this.walletService.listAll(this.monthSelected.value).subscribe(response => {
      this.walletsDebtor = response.content.filter(wallet => wallet.typeWallet === 'DEBTOR');
      this.walletsCreditor = response.content.filter(wallet => wallet.typeWallet === 'CREDITOR');
    })
  }

  findWalletsSummary() {
    this.walletService.findWalletsSummary(this.monthSelected.value).subscribe(response => {
      this.walletSummary = response;
    })
  }

  redirectRecord(wallet: Wallet) {
    this.walletService.wallet = wallet;
    this.router.navigate([`wallet/record`]);
  }

}
