import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { API_URL } from '../../core/api-url.token';
import { LoginResult } from '../../common/models/login-result.model';

@Injectable()
export class LoginService {
  private readonly _url: string;

  constructor(private _httpClient: HttpClient, @Inject(API_URL) apiUrl: string) {
    this._url = `${apiUrl}/api/account/`;
  }

  login(model: any): Observable<LoginResult> {
    return this._httpClient.post<LoginResult>(`${this._url}login`, model, { withCredentials: true });
  }

}
