import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  /**
   *
   */
  constructor(private _authService: AuthService, private _router: Router) {

  }
  
  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
  //   return this._authService.getAuthInfo()
  //     .pipe(
  //       map(info => {
  //         if (info != null) {
  //           // let userRoles = info.roles || [];

  //           // let allowedRoles: string | string[] = route.data['allowedRoles'];
  //           // if (allowedRoles) {
  //           //   return this.checkRoles(allowedRoles, userRoles);
  //           // }

  //           return true;
  //         }
  //         return false;
  //       }),
  //       catchError((error: HttpErrorResponse) => {
  //         // TODO: Define error status codes to handle
  //         if (error.status === 500 || error.status === 0) {
  //           this._router.navigate(['/error'], { skipLocationChange: true, queryParams: { status: error.status } });
  //         }
  //         return of(false);
  //       })
  //     );
  // }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return true;
  }
}
