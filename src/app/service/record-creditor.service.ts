import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Page} from '../model/page.model';
import {RecordCreditor} from '../model/record-creditor.model';
import {environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {MessageService} from './message.service';
import {Transfer} from '../model/transfer.model';

@Injectable({
  providedIn: 'root'
})
export class RecordCreditorService {

  listRecordsEvent = new EventEmitter<string>();

  constructor(private http: HttpClient, private messageService: MessageService) {}

  create(record: RecordCreditor): Observable<RecordCreditor> {
    return this.http.post<RecordCreditor>(`${environment.api}/records-creditor`, record).pipe(
      map(obj => {
        this.listRecordsEvent.emit(obj.title);
        return obj;
      }),
      catchError(e => this.messageService.errorHandler(e))
    );
  }

  cancelCreditor(idCreditor: string): Observable<void> {
    return this.http.post<void>(`${environment.api}/transactions/record-creditor/${idCreditor}/cancel`, {}).pipe(
      map(obj => { this.listRecordsEvent.emit(''); return obj; }),
      catchError(e => this.messageService.errorHandler(e))
    );
  }

  transfer(transfer: Transfer): Observable<void> {
    return this.http.post<void>(`${environment.api}/transactions/transfers`, transfer).pipe(
      map(obj => {
        this.listRecordsEvent.emit('');
        return obj;
      }),
      catchError(e => this.messageService.errorHandler(e))
    );
  }

  listAll(params: HttpParams): Observable<Page<RecordCreditor>> {
    return this.http.get<Page<RecordCreditor>>(`${environment.api}/records-creditor`, {params}).pipe(
      map(obj => obj),
      catchError(e => this.messageService.errorHandler(e)));
  }
}
