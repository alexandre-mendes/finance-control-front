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

  listAll(): Observable<Page<Wallet>> {
    return this.http.get<Wallet[]>(`${environment.api}/wallet`).pipe(
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

  findWalletsSummary(): Observable<WalletSummary> {
    return this.http.get<WalletSummary>(`${environment.api}/wallet/summary`).pipe(
      map(obj => obj),
      catchError(e => this.messageService.errorHandler(e))
    )
  }
}
