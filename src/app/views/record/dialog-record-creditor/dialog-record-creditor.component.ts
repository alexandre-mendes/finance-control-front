import { Wallet } from './../../wallet/wallet.model';
import { RecordCreditor } from './../record-creditor.model';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/shared/message.service';
import { RecordService } from '../record.service';

@Component({
  selector: 'app-dialog-record-creditor',
  templateUrl: './dialog-record-creditor.component.html',
  styleUrls: ['./dialog-record-creditor.component.css']
})
export class DialogRecordCreditorComponent implements OnInit {

  record: RecordCreditor = {};

  constructor(private route: ActivatedRoute,
    private recordService: RecordService,
    private messageService: MessageService,
    private dialogRef: MatDialogRef<DialogRecordCreditorComponent>) { }

  ngOnInit(): void {
  }

  save() {
    this.recordService.create(this.record).subscribe(() => {
      this.messageService.showMessage("Registro salvo com sucesso.")
      this.dialogRef.close();
    })
  }
}
