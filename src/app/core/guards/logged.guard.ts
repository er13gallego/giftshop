import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoggedGuard implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router) {}

  canActivate(): Observable<boolean> {
    return this._authService.getAuthInfo().pipe(
      map(
        res => {
          if (res == null) {
            return true;
          }
          // return false;
          this._router.navigate(['/products']);
        },
        err => {
          return true;
        }
      )
    );
  }
}
