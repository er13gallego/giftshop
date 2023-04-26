import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { filter, map, distinctUntilChanged, flatMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

function getTitle(router: Router) {
  let currentRoute = router.routerState.root;
  let titleText = '';
  do {
    const childrenRoutes = currentRoute.children;
    currentRoute = null;
    childrenRoutes.forEach(routes => {
      if (routes.outlet === 'primary') {
        if (routes.snapshot.data.title) {
          titleText = routes.snapshot.data.title;
        }
        currentRoute = routes;
      }
    });
  } while (currentRoute);

  return titleText;
}

@Component({
  selector: 'app-title',
  template: '{{title}}',
  styleUrls: []
})
export class TitleComponent implements OnInit, OnDestroy {

  private readonly subscription: Subscription;
  title: string;

  constructor(router: Router, translate: TranslateService, title: Title) {
    this.title = title.getTitle();
    this.subscription = router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => getTitle(router)),
        distinctUntilChanged(),
        filter(t => !!t),
        flatMap(t => translate.get(t))
      )
      .subscribe((event: string) => {
        this.title = event;
        title.setTitle(event);
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
