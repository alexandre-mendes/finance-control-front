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

  issueRecordCreated = new EventEmitter<string>();
  wallet: Wallet = {};
  recordPayment: RecordDebtor = {};

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
    return this.http.post<RecordDebtor>(`${environment.api}/record-debtor`, record).pipe(
      map(obj => 
        { this.issueRecordCreated.emit(obj.title); 
          return obj;                             }),
      catchError(e => this.messageService.errorHandler(e))
    );
  }

  createRecordCreditor(record: RecordCreditor): Observable<RecordCreditor> {
    record.walletUuid = this.wallet.uuid;
    return this.http.post<RecordCreditor>(`${environment.api}/record-creditor`, record).pipe(
      map(obj => 
        { this.issueRecordCreated.emit(obj.title); 
          return obj;                             }),
      catchError(e => this.messageService.errorHandler(e))
    );
  }

  listAllDebtor(uuidWallet?: string, month?: number): Observable<Page<RecordDebtor>> {
    return this.http.get<Page<RecordDebtor>>(`${environment.api}/record-debtor/wallet/${uuidWallet}/month/${month}`).pipe(
      map(obj => obj),
      catchError(e => this.messageService.errorHandler(e))
    );
  }

  listAllCreditor(uuidWallet?: string, month?: number): Observable<Page<RecordCreditor>> {
    return this.http.get<Page<RecordCreditor>>(`${environment.api}/record-creditor/wallet/${uuidWallet}/month/${month}`).pipe(
      map(obj => obj),
      catchError(e => this.messageService.errorHandler(e))
    );
  }

  pay(uuidDebtor: string, uuidCreditor: string): Observable<void> {
    return this.http.post<void>(`${environment.api}/payment`, {uuidDebtor: uuidDebtor, uuidCreditor: uuidCreditor}).pipe(
      map(obj => obj),
      catchError(e => this.messageService.errorHandler(e))
    )
  }

  findCurrentMonth(): Observable<number> {
    return this.http.get<number>(`${environment.api}/month/current`).pipe(
      map(obj => obj),
      catchError(e => this.messageService.errorHandler(e))
    )
  }
}
