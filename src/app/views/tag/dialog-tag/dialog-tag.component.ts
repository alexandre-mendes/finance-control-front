import { Component, EventEmitter, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { Tag } from "src/app/model/tag.model";
import { MessageService } from "src/app/service/message.service";
import { TagService } from "src/app/service/tag.service";

@Component({
    selector: 'app-dialog-tag',
    templateUrl: './dialog-tag.component.html'
})
export class DialogTagComponent implements OnInit {

    tag: Tag = {};
   
    constructor(private dialogRef: MatDialogRef<DialogTagComponent>,
        private tagService: TagService,
        private messageService: MessageService) {
            this.tagService.editTagEvent.subscribe(tag => {
                this.tag = tag;
            });
        }
     
    ngOnInit(): void {}

    save() {
        if (this.tag.id === undefined) {
            this.tagService.save(this.tag).subscribe(() => {
                this.messageService.showMessage("Tag salva com sucesso.")
                this.dialogRef.close();
            })
        } else {
            this.tagService.update(this.tag).subscribe(() => {
                this.messageService.showMessage("Tag atualizada com sucesso.")
                this.dialogRef.close();
            })
        }
    }
}