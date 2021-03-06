import { HttpParams } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import { Tag } from "src/app/model/tag.model";
import { MessageService } from "src/app/service/message.service";
import { TagService } from "src/app/service/tag.service";
import { DialogConfirmComponent } from "src/app/shared/dialog-confirm/dialog-confirm.component";
import { DialogTagComponent } from "./dialog-tag/dialog-tag.component";

@Component({
    selector: 'app-tag',
    templateUrl: './tag.component.html'})
export class TagComponent implements OnInit {
    length = 0;
    pageSize = 10;
    pageNumber = 0;

    tags: Tag[] = []

    constructor(public dialog: MatDialog, 
        private tagService: TagService,
        private messageService: MessageService) {}
    
    ngOnInit(): void {
        this.listAll();
        this.tagService.listTagsEvent.subscribe(() => {
            this.listAll();
        })
    }

    listAll() {
        let params = new HttpParams();
        params = params.append('size', this.pageSize?.toString());
        params = params.append('page', this.pageNumber?.toString());
        this.tagService.listAll(params).subscribe(response => {
            this.tags = response.content;
            this.length = response.totalElements;
            this.pageNumber = response.number;
        })
    }

    delete(tag: Tag) {
        const confirmDialog = this.dialog.open(DialogConfirmComponent, {
            data: {
              title: 'Confirmação',
              message: 'Deseja realmente remover a tag ' + tag.title + '?'
            }
          });

        confirmDialog.afterClosed().subscribe(result => {
            if (result === true) {
              this.tagService.delete(tag.id).subscribe(response => {
                this.messageService.showMessage("Tag removida com sucesso.")
              })
            }
          });
    }

    openDialog() {
        const dialogRef = this.dialog.open(DialogTagComponent);
    }

    openEditDialog(tag: Tag) {
        const dialogRef = this.dialog.open(DialogTagComponent);
        this.tagService.editTagEvent.emit(tag);
    }

    pageChangeEvent(event: PageEvent) {
        this.pageNumber = event.pageIndex;
        this.listAll();
    }
}