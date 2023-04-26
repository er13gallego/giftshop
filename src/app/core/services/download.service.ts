import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';


const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
const contentDispositionHeader = 'Content-Disposition';
const defaultFilename = 'file';

function getFilename(disposition: string): string {
  const index = disposition.indexOf('attachment');
  if (index >= 0) {
    const matches = filenameRegex.exec(disposition);
    if (matches != null && matches[1]) {
      const filename = matches[1].replace(/['"]/g, '');
      return filename;
    }
  }

  return '';
}

function downloadBlob(blob: Blob, filename: string) {
  const url = window.URL.createObjectURL(blob);
  const a = window.document.createElement('a');
  a.style.display = 'none';
  window.document.body.appendChild(a);
  try {
    a.href = url;
    a.download = filename;
    a.click();
  } finally {
    window.document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}

function wrap(request: Observable<HttpResponse<Blob>>): Observable<HttpResponse<Blob>> {
  return request.pipe(
    switchMap((response: HttpResponse<Blob>) => {
      try {
        downloadFromResponse(response);
        return of(response);
      } catch (error) {
        return throwError(error);
      }
    })
  );
}

function downloadFromResponse(response: HttpResponse<Blob>): void {
  const contentDisposition = response.headers.get(contentDispositionHeader);
  const filename = contentDisposition && getFilename(contentDisposition) || defaultFilename;

  if (typeof window.navigator.msSaveBlob === 'function') {
    // IE
    window.navigator.msSaveBlob(response.body, filename);
  } else {
    downloadBlob(response.body, filename);
  }
}

@Injectable()
export class DownloadService {

  constructor(private _httpClient: HttpClient) { }

  public get(url: string, params: any = null): Observable<any> {
    return wrap(this._httpClient.get(url, {
      params: params || {},
      responseType: 'blob',
      observe: 'response'
    }));
  }

  public post(url: string, body: any = null, params: any = null): Observable<any> {
    return wrap(this._httpClient.post(url, body, {
      params: params || {},
      responseType: 'blob',
      observe: 'response'
    }));
  }
}
