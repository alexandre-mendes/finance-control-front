import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import jwt_decode, { JwtPayload } from 'jwt-decode'
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../model/user.model';
import { Login } from '../model/login.model';
import { Token } from '../model/token.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  loadingEvent = new EventEmitter<boolean>();

  constructor(private http: HttpClient,
    private messageService: MessageService) { }

  async login(user: Login) {
    this.loadingEvent.emit(true);
    const result = await this.http.post<Token>(`${environment.api}/auth`, user).toPromise();
    let token = result.token;

    window.localStorage.setItem('token', token);
    this.loadingEvent.emit(false);
      return true;
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${environment.api}/users`, user).pipe(
      map(obj => {
        this.loadingEvent.emit(true);
        return obj
      }),
      catchError((e) => {
        this.loadingEvent.emit(false);
        return this.messageService.errorHandler(e)
      })
    );
  }

  userActivation(user: User): Observable<void> {
    return this.http.post<void>(`${environment.api}/users/activation`, user).pipe(
      map(obj => {
        this.loadingEvent.emit(true);
        return obj;
      }),
      catchError(e => {
        this.loadingEvent.emit(false);
        return this.messageService.errorHandler(e)
      })
    );
  }

  getAuthorizationToken() {
    const token = window.localStorage.getItem('token');
    return token;
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode<JwtPayload>(token)

    if (decoded.exp === undefined) {
      return new Date(0);
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }

    return !(date.valueOf() > new Date().valueOf());
  }

  isUserLoggedIn() {
    const token = this.getAuthorizationToken();
    if (!token) {
      return false;
    } else if (this.isTokenExpired(token)) {
      return false;
    }

    return true;
  }
}
