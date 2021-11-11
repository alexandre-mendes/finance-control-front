import { WalletService } from '../../../service/wallet.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../../../service/message.service';
import { RecordDebtor } from '../../../model/record-debtor.model';
import { RecordService } from '../../../service/record.service';
import { TagService } from 'src/app/service/tag.service';
import { Tag } from 'src/app/model/tag.model';

@Component({
  selector: 'app-dialog-record-debtor',
  templateUrl: './dialog-record-debtor.component.html',
  styleUrls: ['./dialog-record-debtor.component.css']
})
export class DialogRecordDebtorComponent implements OnInit {

  record: RecordDebtor = {installments: 1};
  dayWallet?: number = undefined;
  tags: Tag[] = []
  tagSelected: Tag = {}

  constructor(private route: ActivatedRoute,
    private recordService: RecordService,
    private tagService: TagService,
    private messageService: MessageService,
    private dialogRef: MatDialogRef<DialogRecordDebtorComponent>,
    private walletService: WalletService) { }

  ngOnInit(): void {
    let date = new Date();
    date.setDate(this.walletService.wallet.dayWallet || 1)
    date.setMonth(this.recordService.monthSelected)
    this.record.dateDeadline = date;
    this.dayWallet = this.walletService.wallet.dayWallet;
    this.listTags();
  }

  save() {
    this.recordService.create(this.record).subscribe(() => {
      this.messageService.showMessage("Registro salvo com sucesso.")
      this.dialogRef.close();
    })
  }

  listTags() {
    this.tagService.listAll().subscribe(response => {
      this.tags = response.content;
    })
  }
}
