import { Wallet } from '../model/wallet.model';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MessageService } from './message.service';
import { Page } from '../model/page.model';
import { WalletSummary } from '../model/wallet-summary.model';
import { Month } from '../model/month.model';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  listWalletsEvent = new EventEmitter<string>();

  wallet: Wallet = {};
  monthSelected?: Month = {label: '', value: 0};
  yearSelected?: number;

  constructor(private http: HttpClient, private messageService: MessageService) { }

  create(wallet: Wallet): Observable<Wallet> {
    return this.http.post<Wallet>(`${environment.api}/wallets`, wallet).pipe(
      map(obj =>
        { this.listWalletsEvent.emit('');
          return obj;                             }),
      catchError(e => this.messageService.errorHandler(e))
    );
  }

  delete(id?: string): Observable<void> {
    return this.http.delete<void>(`${environment.api}/wallets/${id}`).pipe(
      map(obj => {
        this.listWalletsEvent.emit('');
        return obj;
      }),
      catchError(e => this.messageService.errorHandler(e))
    );
  }

  listAll(params: HttpParams): Observable<Page<Wallet>> {
    return this.http.get<Wallet[]>(`${environment.api}/wallets`, {params}).pipe(
      map(obj => obj),
      catchError(e => this.messageService.errorHandler(e))
    );
  }

  listAllCreditor(month: number, year: number): Observable<Page<Wallet>> {
    const firstDate = this.getDateFormated(new Date(year, month - 1, 1));
    const lastDate = this.getDateFormated(new Date(year, month, 0));

    return this.http.get<Wallet[]>(`${environment.api}/wallets?first-date=${firstDate}&last-date=${lastDate}&type-wallet=CREDITOR`).pipe(
      map(obj => obj),
      catchError(e => this.messageService.errorHandler(e))
    );
  }

  findWalletsSummary(month: number, year: number): Observable<WalletSummary> {
    return this.http.get<WalletSummary>(`${environment.api}/wallets/summary?month=${month}&year=${year}`).pipe(
      map(obj => obj),
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
