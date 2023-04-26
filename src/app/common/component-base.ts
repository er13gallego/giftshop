// @angular
import { OnDestroy } from '@angular/core';

// libs
import { Observable } from 'rxjs';

// app
import { RequestCounter } from './requestCounter';

const editMode = 'edit';
const addMode = 'add';

export class ComponentBase implements OnDestroy {

  private _mode: string;
  private readonly _counter: RequestCounter;
  private readonly _ownsCounter: boolean;

  public get editMode(): boolean {
    return this._mode === editMode;
  }

  public get addMode(): boolean {
    return this._mode === addMode;
  }

  public get loading(): boolean {
    return this._counter.loading;
  }

  public get loadingObservable(): Observable<boolean> {
    return this._counter.loadingObservable;
  }

  constructor(counter: RequestCounter = null) {
    this._counter = counter || new RequestCounter();
    this._ownsCounter = !counter;
  }

  ngOnDestroy() {
    if (this._ownsCounter) {
      this._counter.ngOnDestroy();
    }
  }

  protected registerRequest<T = any>(observable: Observable<T>): Observable<T> {
    return this._counter.registerRequest(observable);
  }

  protected wrap<T = any>(observable: Observable<T>): Observable<T> {
    return this._counter.wrap(observable);
  }

  protected setEditMode(): void {
    this._mode = editMode;
  }

  protected setAddMode(): void {
    this._mode = addMode;
  }
}
