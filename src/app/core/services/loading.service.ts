import { Injectable } from '@angular/core';
import { Router, RouterEvent, NavigationStart, GuardsCheckStart } from '@angular/router';
import { Observable } from 'rxjs';
import { map, filter, distinctUntilChanged } from 'rxjs/operators';

@Injectable()
export class LoadingService {

  loading$: Observable<boolean>;

  constructor(router: Router) {
    this.loading$ = router.events.pipe(
      filter(e => e instanceof RouterEvent),
      map((event: RouterEvent) => {
        if (event instanceof NavigationStart || event instanceof GuardsCheckStart) {
          return true;
        }
        return false;
      },
      distinctUntilChanged())
    );
  }
}
