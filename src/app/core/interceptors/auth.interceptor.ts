import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpInterceptor } from '@angular/common/http';

// libs
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { RedirectService, RedirectReason } from '../../core/services/redirect.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _redirectService: RedirectService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      withCredentials: true
    });

    return next.handle(request).pipe(catchError(err => {
      // check for unauthorized error and redirect to login page.
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this._redirectService.toLogin(true, RedirectReason.Unauthorized);
        }
      }
      return throwError(err);
    }));
  }
}
