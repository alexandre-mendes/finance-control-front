import {HttpClient, HttpParams} from '@angular/common/http';
import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {Page} from '../model/page.model';
import {RecordDebtor} from '../model/record-debtor.model';
import {MessageService} from './message.service';
import {PaymentAll} from '../model/payment-all.model';
import {PaymentOne} from '../model/payment-one.model';

@Injectable({
  providedIn: 'root'
})
export class RecordDebtorService {

  listRecordsEvent = new EventEmitter<string>();

  constructor(private http: HttpClient, private messageService: MessageService) { }

  create(record: RecordDebtor): Observable<RecordDebtor> {
    return this.http.post<RecordDebtor>(`${environment.api}/records-debtor`, record).pipe(
      map(obj => obj),
      catchError(e => this.messageService.errorHandler(e))
    );
  }

  listAll(params: HttpParams): Observable<Page<RecordDebtor>> {
      return this.http.get<Page<RecordDebtor>>(`${environment.api}/records-debtor`, {params}).pipe(
      map(obj => obj),
      catchError(e => this.messageService.errorHandler(e))
    );
  }

  delete(registrationCode: string): Observable<void> {
    return this.http.delete<void>(`${environment.api}/records-debtor/registration-code/${registrationCode}`).pipe(
      map(obj => {
        this.listRecordsEvent.emit('');
        return obj;
      }),
      catchError(e => this.messageService.errorHandler(e))
    );
  }

  payAll(paymentAll: PaymentAll): Observable<void> {
    return this.http.post<void>(`${environment.api}/transactions/pay-all`, paymentAll).pipe(
      map(() => {
        this.listRecordsEvent.emit('');
      }),
      catchError(e => this.messageService.errorHandler(e))
    );
  }

  pay(paymentOne: PaymentOne): Observable<void> {
    return this.http.post<void>(`${environment.api}/transactions/pays`, paymentOne).pipe(
      map(() => {
        this.listRecordsEvent.emit('');
      }),
      catchError(e => this.messageService.errorHandler(e))
    );
  }

  findTotal(params: HttpParams): Observable<number> {
    return this.http.get<number>(`${environment.api}/records-debtor/total`, {params}).pipe(
      map(response => response),
      catchError(e => this.messageService.errorHandler(e)));
  }
}
