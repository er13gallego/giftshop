// Angular
import { OnDestroy, Injectable } from '@angular/core';

import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { map, distinctUntilChanged, takeUntil, finalize } from 'rxjs/operators';

// libs

enum RequestAction {
  Increase = 1,
  Decrease = -1
}

@Injectable()
export class RequestCounter implements OnDestroy {
  private _ngUnsubscribe = new Subject();
  private readonly _requestsSubject = new Subject<number>();
  private readonly _loadingSubject = new BehaviorSubject<boolean>(false);

  private _requestCount = 0;

  public get isDestroyed(): boolean {
    return this._ngUnsubscribe === null;
  }

  public get loading(): boolean {
    return this._loadingSubject.value;
  }

  public get loadingObservable(): Observable<boolean> {
    return this._loadingSubject;
  }

  constructor() {
    this._requestsSubject.pipe(
      map(delta => {
        this._requestCount += delta;
        if (this._requestCount < 0) {
          throw new Error('Request count should not reach negative.');
        }
        return this._requestCount > 0;
      }),
      distinctUntilChanged()
    ).subscribe(value => {
      setTimeout(() => {
        this._loadingSubject.next(value);
      });
    });
  }

  registerRequest<T = any>(observable: Observable<T>): Observable<T> {
    if (this.isDestroyed) {
      throw new Error('Instance is destroyed');
    }

    this.setRequestCount(RequestAction.Increase);
    try {
      return observable
        .pipe(
          takeUntil(this._ngUnsubscribe),
          finalize(() => {
            this.setRequestCount(RequestAction.Decrease);
          })
        );
    } catch {
      this.setRequestCount(RequestAction.Decrease);
    }
  }

  wrap<T = any>(observable: Observable<T>): Observable<T> {
    return observable.pipe(takeUntil(this._ngUnsubscribe));
  }

  ngOnDestroy(): void {
    if (this.isDestroyed) {
      return;
    }
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
    this._ngUnsubscribe = null;

    this._requestsSubject.complete();
    this._loadingSubject.complete();

    this._requestCount = 0;
  }

  private setRequestCount(delta: RequestAction) {
    this._requestsSubject.next(delta);
  }
}
