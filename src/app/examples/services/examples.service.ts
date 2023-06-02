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

  public readonly _url: string = 'https://localhost:44383/api/';

  constructor(
    private _httpClient: HttpClient) {
      
  }

  getPage(query: PaginatedRequest, type: string): Observable<PaginatedResult<any>> {
    const params: any = query;
    
    return this._httpClient.get<PaginatedResult<any>>(this._url + type, { params });
  }

  get(id: string, type: string): Observable<any> {
    return this._httpClient.get<any>(`${this._url}${type}/${id}`);
  }

  save(model: any, type: string): Observable<any> {
    return this._httpClient.post<any>(this._url + type, model);
  }

  update(id: string, model: any, type: string): Observable<any> {
    return this._httpClient.put<any>(`${this._url}${type}/${id}`, model);
  }

  delete(id: string, type: string): Observable<any> {
    return this._httpClient.delete<any>(`${this._url}${type}/${id}`);
  }

  getAuth(type: string): Observable<any>{
    return this._httpClient.get<any>(`${this._url}${type}`);
  }
}
