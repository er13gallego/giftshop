import { Injectable, OnDestroy, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, finalize, map } from 'rxjs/operators';

import { RedirectService, RedirectReason } from './redirect.service';
import { urlEncode } from '../../common/util';
import { AuthModel } from '../../common/models/auth.model';
import { LoginResult } from '../../common/models/login-result.model';
import { API_URL } from '../api-url.token';

const anonymous: AuthModel = {
  id: '',
  email: '',
  name: '',
  roles: [],
  expiresIn: 0
};

@Injectable()
export class AuthState implements OnDestroy {

  private _latestOrAnonymous = new BehaviorSubject<AuthModel>(anonymous);

  public get current(): AuthModel {
    return this._latestOrAnonymous.value;
  }

  public get isAuthenticated(): boolean {
    return this._latestOrAnonymous.value !== anonymous;
  }

  /**
   * Gets an observable for the latest resolved auth info or the default info (anonymous)
   * if not resolved yet
   * @returns Observable<any>
   */
  public get info$(): Observable<AuthModel> {
    return this._latestOrAnonymous;
  }

  public set(info: AuthModel) {
    this._latestOrAnonymous.next(info);
  }

  ngOnDestroy(): void {
    this._latestOrAnonymous.complete();
  }
}

@Injectable()
export class AuthService {
  private readonly _url: string;

  constructor(
    private _httpClient: HttpClient,
    private _state: AuthState,
    private _redirect: RedirectService,
    @Inject(API_URL) apiUrl: string
  ) {
    this._url = `${apiUrl}/api/account/`;
  }

  /**
   * Gets an observable for the latest resolved auth info
   * @returns Observable<any>
   */
  public getAuthInfo(): Observable<AuthModel> {
    if (this._state.isAuthenticated) {
      return of(this._state.current);
    }
    return this.get();
  }

  public isAuthenticated(): Observable<boolean> {
    if (this._state.isAuthenticated) {
      return of(true);
    }
    return this._httpClient.get<any>(`${this._url}authenticated`)
      .pipe(
        map(response => {
          return response.isAuthenticated;
        })
      );
  }

  public reload() {
    this.get().subscribe(() => { });
  }

  public login(model: any): Observable<LoginResult> {
    return this._httpClient.post<LoginResult>(`${this._url}login`, model);
  }

  public logOut(timedOut: boolean = false): void {
    this._httpClient.post<void>(`${this._url}logout`, {})
      .pipe(finalize(() => {
        this._redirect.toLogin(timedOut, timedOut ? RedirectReason.TimeOut : RedirectReason.LogOut);
      }))
      .subscribe(() => {
        this._state.set(anonymous);
      }, () => {

      });
  }

  public forgotPassword(model: any): Observable<any> {
    return this._httpClient.post<LoginResult>(`${this._url}forgot-password`, model);
  }

  public resetPassword(model: any): Observable<any> {
    return this._httpClient.post<LoginResult>(`${this._url}reset-password`, model);
  }

  public validateActivationToken(userId: string, token: string): Observable<any> {
    // Need to manually encode the params since Angular seems to have problems
    // encoding the token correctly
    const params = urlEncode({ userId, token });
    return this._httpClient.get<LoginResult>(`${this._url}activate${params}`);
  }

  public activate(model: any): Observable<any> {
    return this._httpClient.post<LoginResult>(`${this._url}activate`, model);
  }

  public changePassword(model: any): Observable<any> {
    return this._httpClient.post(`${this._url}change-password`, model);
  }

  public updatePassword(model: any): Observable<any> {
    return this._httpClient.post(`${this._url}update-password`, model);
  }

  private get(): Observable<AuthModel> {
    return this._httpClient.get<AuthModel>(`${this._url}info`)
      .pipe(
        tap(response => {
          this._state.set(response);
        })
      );
  }
}
