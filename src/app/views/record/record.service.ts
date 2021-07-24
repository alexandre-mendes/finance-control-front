import { Wallet } from './../wallet/wallet.model';
import { RecordCreditor } from './record-creditor.model';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'src/app/shared/message.service';
import { RecordDebtor } from './record-debtor.model';
import { Page } from 'src/app/shared/page.model';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  updateRecords = new EventEmitter<string>();
  wallet: Wallet = {};
  recordPayment: RecordDebtor = {};
  monthSelected: number = 1;
  yearSelected: number = 1;

  constructor(private http: HttpClient, private messageService: MessageService) { }

  create(record: Object): Observable<{}> {
    if(this.wallet.typeWallet === "DEBTOR") {
      return this.createRecordDebtor(record);
    } else {
      return this.createRecordCreditor(record);
    }
  }

  createRecordDebtor(record: RecordDebtor): Observable<RecordDebtor> {
    record.walletUuid = this.wallet.uuid;
    return this.http.post<RecordDebtor>(`${environment.api}/records-debtor`, record).pipe(
      map(obj => 
        { this.updateRecords.emit(obj.title); 
          return obj;                             }),
      catchError(e => this.messageService.errorHandler(e))
    );
  }

  createRecordCreditor(record: RecordCreditor): Observable<RecordCreditor> {
    record.walletUuid = this.wallet.uuid;
    return this.http.post<RecordCreditor>(`${environment.api}/records-creditor`, record).pipe(
      map(obj => 
        { this.updateRecords.emit(obj.title); 
          return obj;                             }),
      catchError(e => this.messageService.errorHandler(e))
    );
  }

  listAllDebtor(uuidWallet?: string): Observable<Page<RecordDebtor>> {
    return this.http.get<Page<RecordDebtor>>(`${environment.api}/records-debtor/wallets/${uuidWallet}/months/${this.monthSelected}/years/${this.yearSelected}`).pipe(
      map(obj => obj),
      catchError(e => this.messageService.errorHandler(e))
    );
  }

  listAllCreditor(uuidWallet?: string): Observable<Page<RecordCreditor>> {
    return this.http.get<Page<RecordCreditor>>(`${environment.api}/records-creditor/wallets/${uuidWallet}/months/${this.monthSelected}/years/${this.yearSelected}`).pipe(
      map(obj => obj),
      catchError(e => this.messageService.errorHandler(e))
    );
  }

  pay(uuidRecordDebtor: string, uuidWalletCreditor: string): Observable<void> {
    return this.http.post<void>(`${environment.api}/transactions/pays`, {uuidRecordDebtor: uuidRecordDebtor, uuidWalletCreditor: uuidWalletCreditor}).pipe(
      map(obj => 
        { this.updateRecords.emit("");
          return obj;                       }),
      catchError(e => this.messageService.errorHandler(e))
    )
  }

  transfer(uuidOrigin: string, uuidDestiny: string, valueTransfer: number): Observable<void> {
    return this.http.post<void>(`${environment.api}/transactions/transfers`, 
    {uuidOrigin: uuidOrigin, uuidDestiny: uuidDestiny, valueTransfer: valueTransfer}).pipe(
      map(obj => 
        { this.updateRecords.emit("");
          return obj;                       }),
      catchError(e => this.messageService.errorHandler(e))
    )
  }

  findCurrentMonth(): Observable<number> {
    return this.http.get<number>(`${environment.api}/date/month/current`).pipe(
      map(obj => obj),
      catchError(e => this.messageService.errorHandler(e))
    )
  }

  findYears(): Observable<Page<number>> {
    return this.http.get<Page<number>>(`${environment.api}/date/years`).pipe(
      map(res => res),
      catchError(e => this.messageService.errorHandler(e))
    )
  }

  findCurrentYear(): Observable<number> {
    return this.http.get<number>(`${environment.api}/date/years/current`).pipe(
      map(res => res),
      catchError(e => this.messageService.errorHandler(e))
    )
  }
}
