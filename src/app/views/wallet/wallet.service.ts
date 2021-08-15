import { Wallet } from './wallet.model';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'src/app/shared/message.service';
import { Page } from 'src/app/shared/page.model';
import { WalletSummary } from './wallet-summary.model';
import { Month } from 'src/app/shared/month.model';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  issueWalletCreated = new EventEmitter<string>();
  wallet: Wallet = {};
  monthSelected?: Month = {label: '', value: 0};
  yearSelected?: number;

  constructor(private http: HttpClient, private messageService: MessageService) { }

  create(wallet: Wallet): Observable<Wallet> {
    return this.http.post<Wallet>(`${environment.api}/wallets`, wallet).pipe(
      map(obj => 
        { this.issueWalletCreated.emit(obj.title); 
          return obj;                             }),
      catchError(e => this.messageService.errorHandler(e))
    );
  }

  listAll(month: number, year: number): Observable<Page<Wallet>> {
    let firstDate = this.getDateFormated(new Date(year, month - 1, 1));
    let lastDate = this.getDateFormated(new Date(year, month, 0));

    return this.http.get<Wallet[]>(`${environment.api}/wallets?firstDate=${firstDate}&lastDate=${lastDate}`).pipe(
      map(obj => obj),
      catchError(e => this.messageService.errorHandler(e))
    );
  }

  listAllCreditor(month: number, year: number): Observable<Page<Wallet>> {
    let firstDate = this.getDateFormated(new Date(year, month - 1, 1));
    let lastDate = this.getDateFormated(new Date(year, month, 0));

    return this.http.get<Wallet[]>(`${environment.api}/wallets?firstDate=${firstDate}&lastDate=${lastDate}&type-wallet=CREDITOR`).pipe(
      map(obj => obj),
      catchError(e => this.messageService.errorHandler(e))
    );
  }

  findWalletsSummary(month: number, year: number): Observable<WalletSummary> {
    return this.http.get<WalletSummary>(`${environment.api}/wallets/summarys/months/${month}/years/${year}`).pipe(
      map(obj => obj),
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

  getDateFormated(date: Date): string {
    return moment(date).format('YYYY-MM-DD');
  }
}
