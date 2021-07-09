import { RecordDebtor } from './../record-debtor.model';
import { DialogPaymentDebtorComponent } from './../dialog-payment-debtor/dialog-payment-debtor.component';
import { RecordService } from './../record.service';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-table-record',
  templateUrl: './table-record.component.html',
  styleUrls: ['./table-record.component.css']
})
export class TableRecordComponent implements OnInit {

  @Input()
  dataSource: {}[] = [];

  displayedColumns: string[] = ['deadline', 'title', 'valor', 'paid', 'actions'];

  constructor(private recordService: RecordService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  pay(recordDebtor: RecordDebtor) {
    this.recordService.recordPayment = recordDebtor;
    this.dialog.open(DialogPaymentDebtorComponent);
  }

}
