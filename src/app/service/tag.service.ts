import { HttpClient, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Page } from '../model/page.model';
import { Tag } from '../model/tag.model';
import { MessageService } from './message.service';

@Injectable({
    providedIn: 'root'
})
export class TagService {

    listTagsEvent = new EventEmitter<string>();
    editTagEvent = new EventEmitter<Tag>();

    constructor(private http: HttpClient, private messageService: MessageService) { }

    save(tag: Tag): Observable<Tag> {
        return this.http.post<Tag>(`${environment.api}/tags`, tag).pipe(
            map(response => {
                this.listTagsEvent.emit('');
                return response;
            }),
            catchError(e => this.messageService.errorHandler(e))
        );
    }

    update(tag: Tag): Observable<Tag> {
        return this.http.put<Tag>(`${environment.api}/tags`, tag).pipe(
            map(response => {
                this.listTagsEvent.emit('');
                return response;
            }),
            catchError(e => this.messageService.errorHandler(e))
        );
    }

    listAll(params: HttpParams): Observable<Page<Tag>> {
        return this.http.get<Page<Tag>>(`${environment.api}/tags`, {params}).pipe(
            map(response => response),
            catchError(e => this.messageService.errorHandler(e))
        );
    }

    delete(id?: string): Observable<void> {
        return this.http.delete<void>(`${environment.api}/tags/${id}`).pipe(
            map(response => {
                this.listTagsEvent.emit('');
                return response;
            }),
            catchError(e => this.messageService.errorHandler(e))
        );
    }
}
