import { MessageService } from '../../../service/message.service';
import { WalletService } from '../../../service/wallet.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Wallet } from '../../../model/wallet.model';

interface Type {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-dialog-wallet',
  templateUrl: './dialog-wallet.component.html',
  styleUrls: ['./dialog-wallet.component.css']
})
export class DialogWalletComponent implements OnInit {

  types: Type[] = [
    {value: 'ACTIVE', viewValue: 'Ativo'},
    {value: 'PASSIVE', viewValue: 'Passivo'}
  ];

  dias: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

  wallet: Wallet = {};

  constructor(private walletService: WalletService,
              private messageService: MessageService,
              private dialogRef: MatDialogRef<DialogWalletComponent>) { }

  ngOnInit(): void {
  }

  save(): void {
    this.walletService.create(this.wallet).subscribe(() => {
      this.messageService.showMessage('Carteira salva com sucesso.');
      this.dialogRef.close();
    });
  }
}
