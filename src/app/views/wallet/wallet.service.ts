import { Wallet } from './wallet.model';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'src/app/shared/message.service';
import { Page } from 'src/app/shared/page.model';
import { WalletSummary } from './wallet-summary.model';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  issueWalletCreated = new EventEmitter<string>();
  wallet: Wallet = {};

  constructor(private http: HttpClient, private messageService: MessageService) { }

  create(wallet: Wallet): Observable<Wallet> {
    return this.http.post<Wallet>(`${environment.api}/wallet`, wallet).pipe(
      map(obj => 
        { this.issueWalletCreated.emit(obj.title); 
          return obj;                             }),
      catchError(e => this.messageService.errorHandler(e))
    );
  }

  listAll(month: number): Observable<Page<Wallet>> {
    return this.http.get<Wallet[]>(`${environment.api}/wallet/${month}`).pipe(
      map(obj => obj),
      catchError(e => this.messageService.errorHandler(e))
    );
  }

  listAllCreditor(): Observable<Page<Wallet>> {
    return this.http.get<Wallet[]>(`${environment.api}/wallet?typeWallet=CREDITOR`).pipe(
      map(obj => obj),
      catchError(e => this.messageService.errorHandler(e))
    );
  }

  findWalletsSummary(month: number): Observable<WalletSummary> {
    return this.http.get<WalletSummary>(`${environment.api}/wallet/summary/${month}`).pipe(
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
}
