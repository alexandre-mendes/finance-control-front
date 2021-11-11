import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Page } from "../model/page.model";
import { Tag } from "../model/tag.model";
import { MessageService } from "./message.service";

@Injectable({
    providedIn: 'root'
})
export class TagService {

    constructor(private http: HttpClient, private messageService: MessageService) { }

    create(tag: Tag): Observable<Tag> {
        return this.http.post<Tag>(`${environment.api}/tags`, tag).pipe(
            map(response => response),
            catchError(e => this.messageService.errorHandler(e))
        );
    }

    listAll(): Observable<Page<Tag>> {
        return this.http.get<Page<Tag>>(`${environment.api}/tags`).pipe(
            map(response => response),
            catchError(e => this.messageService.errorHandler(e))
        )
    }
}