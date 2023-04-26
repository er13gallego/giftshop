import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ConfigService {

  private _apiUrl: string;
  private _assetsUrl: string;

  get apiUrl(): string {
    return this._apiUrl;
  }

  get assetsUrl(): string {
    return this._assetsUrl;
  }

  constructor(private http: HttpClient) { }

  async load(): Promise<any> {
    const data: any = await this.http.get('/assets/config.json')
      .toPromise();
    this._apiUrl = data.apiUrl;
    this._assetsUrl = data.assetsUrl;
    return data;
  }
}
