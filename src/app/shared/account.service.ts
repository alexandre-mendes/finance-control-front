import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode, { JwtPayload } from 'jwt-decode'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  async login(user: any) {
    
    const result = await this.http.post<any>(`${environment.api}/login`, JSON.stringify(user)).toPromise();
    let token = JSON.parse(JSON.stringify(result)).Authorization.split(" ")[1];

    window.localStorage.setItem('token', token);
      return true;
  }

  async createUser(user: any) {
    const result = await this.http.post<any>(`${environment.api}/user`, JSON.stringify(user)).toPromise();
    return result;
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
