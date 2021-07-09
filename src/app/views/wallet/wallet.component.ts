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

  constructor(public dialog: MatDialog, 
    private walletService: WalletService,
    private router: Router) { }

  ngOnInit(): void {
    this.findWalletsSummary();
    this.listAll();
    this.walletService.issueWalletCreated.subscribe(() => {
      this.listAll();
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogWalletComponent);
  }

  listAll() {
    this.walletService.listAll().subscribe(response => {
      this.walletsDebtor = response.content.filter(wallet => wallet.typeWallet === 'DEBTOR');
      this.walletsCreditor = response.content.filter(wallet => wallet.typeWallet === 'CREDITOR');
    })
  }

  findWalletsSummary() {
    this.walletService.findWalletsSummary().subscribe(response => {
      this.walletSummary = response;
    })
  }

  redirectRecord(wallet: Wallet) {
    this.walletService.wallet = wallet;
    this.router.navigate([`wallet/record`]);
  }

}
