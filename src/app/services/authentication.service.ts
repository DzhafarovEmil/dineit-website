import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {tokenName} from "@angular/compiler";

@Injectable()
export class AuthenticationService {
  public static tokenName = 'token';
  public static refreshTokenName = 'refreshToken';
  public apiRoot = 'https://dineit.herokuapp.com';

  private headers = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.headers = this.headers.set('accept', 'application/json');
    this.headers = this.headers.set('content-type', 'application/x-www-form-urlencoded');
    this.headers = this.headers.set('authorization', 'Basic ' + btoa('dine-it-client' + ':' + 'dine-it-client-pass'));
  }

  public static clearLocalStorage() {
    localStorage.removeItem(AuthenticationService.tokenName);
    localStorage.removeItem(AuthenticationService.refreshTokenName);
    localStorage.removeItem('username');
  }

  public static saveTokenData(data): boolean {
    AuthenticationService.clearLocalStorage();

    const accessToken = data['access_token'];
    const refreshToken = data['refresh_token'];

    if (accessToken != null && refreshToken != null) {
      localStorage.setItem(AuthenticationService.tokenName, accessToken);
      localStorage.setItem(AuthenticationService.refreshTokenName, refreshToken);
      return true;
    }

    return false;
  }

  login(username: string, password: string): Observable<boolean> {
    const url = this.apiRoot + '/oauth/token';

    let params = new HttpParams();
    params = params.set('grant_type', 'password');
    params = params.set('username', username);
    params = params.set('password', password);

    return this.http.get(url, {headers: this.headers, params: params}).map(response => {
      console.log(response);
      return AuthenticationService.saveTokenData(response);
    });
  }
}
