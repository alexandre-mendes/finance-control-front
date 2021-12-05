import { Month } from '../../model/month.model';
import { Component, OnInit } from '@angular/core';
import { DialogWalletComponent } from './dialog-wallet/dialog-wallet.component';
import { MatDialog } from '@angular/material/dialog';
import { WalletService } from '../../service/wallet.service';
import { Wallet } from '../../model/wallet.model';
import { MessageService } from 'src/app/service/message.service';
import { PageEvent } from '@angular/material/paginator';
import { HttpParams } from '@angular/common/http';
import { DialogConfirmComponent } from 'src/app/shared/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  length = 0;
  pageSize = 10;
  pageNumber = 0;

  wallets: Wallet[] = [];
  monthSelected: Month = {label: 'Janeiro', value: 1};
  months: Month[] = [
    {label: 'Janeiro',  value: 1},
    {label: 'Fevereiro', value: 2},
    {label: 'Março',    value: 3},
    {label: 'Abril',    value: 4},
    {label: 'Maio',     value: 5},
    {label: 'Junho',    value: 6},
    {label: 'Julho',    value: 7},
    {label: 'Agosto',   value: 8},
    {label: 'Setembro', value: 9},
    {label: 'Outubro',  value: 10},
    {label: 'Novembro', value: 11},
    {label: 'Dezembro', value: 12},
  ];
  yearSelected = 0;
  years: number[] = [];

  constructor(public dialog: MatDialog,
              private walletService: WalletService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.listAll();

    this.walletService.listWalletsEvent.subscribe(() => {
      this.listAll();
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogWalletComponent);
  }

  delete(wallet: Wallet): void {
    const confirmDialog = this.dialog.open(DialogConfirmComponent, {
      data: {
        title: 'Confirmação',
        message: 'Deseja realmente remover a carteira ' + wallet.title + '?'
      }
    });

    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.walletService.delete(wallet.id).subscribe(response => {
          this.messageService.showMessage('Deletado com sucesso.');
        });
      }
    });
  }

  openEditDialog(wallet: Wallet): void {
    const dialog = this.dialog.open(DialogWalletComponent);
    dialog.componentInstance.wallet = wallet;
  }

  listAll(): void {
    let params = new HttpParams();
    params = params.append('size', this.pageSize?.toString());
    params = params.append('page', this.pageNumber?.toString());
    this.walletService.listAll(params)
      .subscribe(response => {
        this.wallets = response.content;
        this.length = response.totalElements;
        this.pageNumber = response.number;
    });
  }

  pageChangeEvent(event: PageEvent): void {
    this.pageNumber = event.pageIndex;
    this.listAll();
  }
}
