import { Wallet } from './../../wallet/wallet.model';
import { RecordService } from './../record.service';
import { Component, Input, OnInit } from '@angular/core';
import { WalletService } from '../../wallet/wallet.service';
import { MessageService } from 'src/app/shared/message.service';


@Component({
  selector: 'app-table-record-creditor',
  templateUrl: './table-record-creditor.component.html',
  styleUrls: ['./table-record-creditor.component.css']
})
export class TableRecordCreditorComponent implements OnInit {

  @Input()
  dataSource: {}[] = [];

  displayedColumns: string[] = ['dateTransaction', 'title', 'valor', 'actions'];

  wallet: Wallet = {};

  constructor(private walletService: WalletService,
    private recordService: RecordService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.wallet = this.walletService.wallet;
  }

  cancel(uuid: string) {
    this.recordService.cancelCreditor(uuid).subscribe(res => {
      this.messageService.showMessage("Cancelamento realizado com sucesso.")
    })
  }
}
