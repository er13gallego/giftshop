import { Injectable } from '@angular/core';
import { Router, Params, ActivatedRouteSnapshot } from '@angular/router';
import { Location } from '@angular/common';

const loginUrl = '/auth/login';

export enum RedirectReason {
  LogOut,
  TimeOut,
  Unauthorized
}

@Injectable()
export class RedirectService {

  private _reason: RedirectReason = null;
  private _redirected = false;

  get timedOut(): boolean {
    return this._reason === RedirectReason.TimeOut;
  }
  get loggedOut(): boolean {
    return this._reason === RedirectReason.LogOut;
  }
  get redirected(): boolean {
    return this._redirected;
  }

  constructor(private _router: Router, private _location: Location) {

  }

  reset() {
    this._redirected = false;
    this._reason = null;
  }

  toLogin(keep: boolean = false, reason: RedirectReason = null, params?: Params) {
    const current = this._location.path(false);
    if (current.indexOf(loginUrl) === 0) {
      // Already in login page, do nothing
      return;
    }
    const queryParams: Params = {...params};
    if (keep) {
      queryParams['returnUrl'] = current;
    }
    this._redirected = true;
    this._reason = reason;
    this._router.navigate([loginUrl], { queryParams });
  }

  fromRoute(snapshot: ActivatedRouteSnapshot) {
    const returnTo = snapshot.queryParams['returnUrl'];
    if (returnTo) {
      this._router.navigateByUrl(returnTo);
    } else {
      this._router.navigate(['/']);
    }
  }
}
