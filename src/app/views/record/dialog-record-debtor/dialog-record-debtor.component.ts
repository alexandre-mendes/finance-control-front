import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/shared/message.service';
import { RecordDebtor } from '../record-debtor.model';
import { RecordService } from '../record.service';

@Component({
  selector: 'app-dialog-record-debtor',
  templateUrl: './dialog-record-debtor.component.html',
  styleUrls: ['./dialog-record-debtor.component.css']
})
export class DialogRecordDebtorComponent implements OnInit {

  record: RecordDebtor = {};

  constructor(private route: ActivatedRoute,
    private recordService: RecordService,
    private messageService: MessageService,
    private dialogRef: MatDialogRef<DialogRecordDebtorComponent>) { }

  ngOnInit(): void {
  }

  save() {
    this.recordService.create(this.record).subscribe(() => {
      this.messageService.showMessage("Registro salvo com sucesso.")
      this.dialogRef.close();
    })
  }

}
