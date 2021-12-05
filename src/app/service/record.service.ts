import { Wallet } from '../model/wallet.model';
import { RecordCreditor } from '../model/record-creditor.model';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { MessageService } from '../service/message.service';
import { RecordDebtor } from '../model/record-debtor.model';
import { Page } from '../model/page.model';
import * as moment from 'moment';
import {PaymentAll} from '../model/payment-all.model';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  updateRecords = new EventEmitter<string>();
  wallet: Wallet = {};
  recordPayment: RecordDebtor = {};
  monthSelected = 1;
  yearSelected = 1;

  constructor(private http: HttpClient, private messageService: MessageService) { }

  create(record: Object): Observable<{}> {
    if (this.wallet.typeWallet === 'DEBTOR') {
      return this.createRecordDebtor(record);
    } else {
      return this.createRecordCreditor(record);
    }
  }

  createRecordDebtor(record: RecordDebtor): Observable<RecordDebtor> {
    return this.http.post<RecordDebtor>(`${environment.api}/records-debtor`, record).pipe(
      map(obj =>
        { this.updateRecords.emit(obj.title);
          return obj;                             }),
      catchError(e => this.messageService.errorHandler(e))
    );
  }

  createRecordCreditor(record: RecordCreditor): Observable<RecordCreditor> {
    record.wallet = this.wallet;
    return this.http.post<RecordCreditor>(`${environment.api}/records-creditor`, record).pipe(
      map(obj =>
        { this.updateRecords.emit(obj.title);
          return obj;                             }),
      catchError(e => this.messageService.errorHandler(e))
    );
  }

  listAllDebtor(walletId?: string): Observable<Page<RecordDebtor>> {
    const firstDate = this.getDateFormated(new Date(this.yearSelected, this.monthSelected - 1, 1));
    const lastDate = this.getDateFormated(new Date(this.yearSelected, this.monthSelected, 0));

    return this.http.get<Page<RecordDebtor>>(`${environment.api}/records-debtor?wallet-id=${walletId}&first-date=${firstDate}&last-date=${lastDate}`).pipe(
      map(obj => obj),
      catchError(e => this.messageService.errorHandler(e))
    );
  }

  listAllCreditor(walletId?: string): Observable<Page<RecordCreditor>> {
    const firstDate = this.getDateFormated(new Date(this.yearSelected, this.monthSelected - 1, 1));
    const lastDate = this.getDateFormated(new Date(this.yearSelected, this.monthSelected, 0));

    return this.http.get<Page<RecordCreditor>>(`${environment.api}/records-creditor?wallet-id=${walletId}&first-date=${firstDate}&last-date=${lastDate}`).pipe(
      map(obj => obj),
      catchError(e => this.messageService.errorHandler(e))
    );
  }

  pay(recordDebtorId: string, walletCreditorId: string): Observable<void> {
    return this.http.post<void>(`${environment.api}/transactions/pays`, {recordDebtorId, walletCreditorId}).pipe(
      map(obj =>
        { this.updateRecords.emit('');
          return obj;                       }),
      catchError(e => this.messageService.errorHandler(e))
    );
  }

  transfer(originId: string, destinyId: string, valueTransfer: number): Observable<void> {
    return this.http.post<void>(`${environment.api}/transactions/transfers`,
    {originId, destinyId, valueTransfer}).pipe(
      map(obj =>
        { this.updateRecords.emit('');
          return obj;                       }),
      catchError(e => this.messageService.errorHandler(e))
    );
  }

  cancelCreditor(idCreditor: string): Observable<void> {
    return this.http.post<void>(`${environment.api}/transactions/record-creditor/${idCreditor}/cancel`, {}).pipe(
      map(obj => { this.updateRecords.emit(''); return obj; }),
      catchError(e => this.messageService.errorHandler(e))
    );
  }

  deleteDebtor(registrationCode: string): Observable<void> {
    return this.http.delete<void>(`${environment.api}/records-debtor/registration-code/${registrationCode}`).pipe(
      map(obj => { this.updateRecords.emit(''); return obj; }),
      catchError(e => this.messageService.errorHandler(e))
    );
  }

  findCurrentMonth(): Observable<number> {
    return this.http.get<number>(`${environment.api}/date/month/current`).pipe(
      map(obj => obj),
      catchError(e => this.messageService.errorHandler(e))
    );
  }

  findYears(): Observable<Page<number>> {
    return this.http.get<Page<number>>(`${environment.api}/date/years`).pipe(
      map(res => res),
      catchError(e => this.messageService.errorHandler(e))
    );
  }

  findCurrentYear(): Observable<number> {
    return this.http.get<number>(`${environment.api}/date/years/current`).pipe(
      map(res => res),
      catchError(e => this.messageService.errorHandler(e))
    );
  }

  getDateFormated(date: Date): string {
    return moment(date).format('YYYY-MM-DD');
  }
}
