import { Month } from './../../model/month.model';
import { WalletSummary } from '../../model/wallet-summary.model';
import { Component, OnInit } from '@angular/core';
import { DialogWalletComponent } from './dialog-wallet/dialog-wallet.component';
import {MatDialog} from '@angular/material/dialog';
import { WalletService } from '../../service/wallet.service';
import { Wallet } from '../../model/wallet.model';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/service/message.service';

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
    private messageService: MessageService,
    private router: Router) { }

  ngOnInit(): void {
    this.walletService.findCurrentMonth().subscribe(response => {
      if(this.walletService.monthSelected != undefined && this.walletService.monthSelected.value != 0) {
        this.monthSelected = this.months.filter(month => month.value == this.walletService.monthSelected?.value)[0];
      } else {
        this.monthSelected = this.months.filter(month => month.value == response)[0];
      }
      
      this.walletService.findCurrentYear().subscribe(res => {
        if(this.walletService.yearSelected != undefined) {
          this.yearSelected = this.walletService.yearSelected;
        } else {
          this.yearSelected = res;
        }
        
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

  delete(wallet: Wallet) {
    const id = wallet.id == undefined ? "" : wallet.id;
    this.walletService.delete(id).subscribe(response => {
      this.messageService.showMessage("Deletado com sucesso!");
    })
  }

  listAll() {
    this.walletService.listAll(this.monthSelected.value, this.yearSelected).subscribe(response => {
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
    this.walletService.monthSelected = this.monthSelected;
    this.walletService.yearSelected = this.yearSelected;
    this.router.navigate([`wallet/record`]);
  }

}
