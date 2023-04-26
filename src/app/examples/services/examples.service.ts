import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { API_URL } from '../../core/api-url.token';
import { ASSETS_URL } from '../../core/assets-url.token';
import { PaginatedRequest } from '../../common/models/paginated-request.model';
import { PaginatedResult } from '../../common/models/paginated-result.model';
import { Example } from '../../common/models/example.model';

@Injectable()
export class ExamplesService {

  private readonly _url: string;

  constructor(
    private _httpClient: HttpClient,
    @Inject(API_URL) apiUrl: string,
    @Inject(ASSETS_URL) assetsUrl: string) {
    // this._url = `${apiUrl}/api/examples`;
  }

  getPage(query: PaginatedRequest): Observable<PaginatedResult<Example>> {
    const params: any = query;
    return this._httpClient.get<PaginatedResult<Example>>(this._url, { params });
  }

  get(id: string): Observable<Example> {
    return this._httpClient.get<Example>(`${this._url}/${id}`);
  }

  save(model: Example): Observable<any> {
    return this._httpClient.post<any>(this._url, model);
  }

  update(id: string, model: Example,): Observable<any> {
    return this._httpClient.put<any>(`${this._url}/${id}`, model);
  }

  delete(id: string): Observable<any> {
    return this._httpClient.delete<any>(`${this._url}/${id}`);
  }
}
