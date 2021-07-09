import { MessageService } from './../../../shared/message.service';
import { WalletService } from './../wallet.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

interface Type {
  value: string;
  viewValue: string;
}

interface Wallet {
  title: string;
  typeWallet: string;
}

@Component({
  selector: 'app-dialog-wallet',
  templateUrl: './dialog-wallet.component.html',
  styleUrls: ['./dialog-wallet.component.css']
})
export class DialogWalletComponent implements OnInit {

  types: Type[] = [
    {value: 'CREDITOR', viewValue: 'Credora'},
    {value: 'DEBTOR', viewValue: 'Devedora'}
  ];

  wallet: Wallet = {
    title: "",
    typeWallet: ""
  }

  constructor(private walletService: WalletService, 
    private messageService: MessageService,
    private dialogRef: MatDialogRef<DialogWalletComponent>) { }

  ngOnInit(): void {
  }

  save(): void {
    this.walletService.create(this.wallet).subscribe(() => {
      this.messageService.showMessage("Carteira salva com sucesso.")
      this.dialogRef.close();
    })
  }

}
