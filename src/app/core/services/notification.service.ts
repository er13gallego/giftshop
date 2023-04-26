import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

import { Translation } from '../../common/models/translation.model';
import { Dictionary } from '../../common/models/dictionary.model';
import { getMessages } from './translate-helper';

type ToasterFn = (message: string, title?: string) => any;

@Injectable()
export class NotificationService {

  private readonly _fn: Dictionary<ToasterFn>;

  constructor(
    private _toastr: ToastrService,
    private _translate: TranslateService
  ) {
    this._fn = {
      success: this._toastr.success.bind(this._toastr),
      info: this._toastr.info.bind(this._toastr),
      warning: this._toastr.warning.bind(this._toastr),
      error: this._toastr.error.bind(this._toastr)
    };
  }

  public success(message: string | Translation, title?: string | Translation):
    Observable<any> {
    return this.show(this._fn.success, message, title);
  }

  public info(message: string | Translation, title?: string | Translation):
    Observable<any> {
    return this.show(this._fn.info, message, title);
  }

  public warning(message: string | Translation, title?: string | Translation):
    Observable<any> {
    return this.show(this._fn.warning, message, title);
  }

  public error(message: string | Translation, title?: string | Translation):
    Observable<any> {
    return this.show(this._fn.error, message, title);
  }

  public clearToasts(): void {
    this._toastr.clear();
  }

  private show(fn: ToasterFn,
               message: string | Translation,
               title?: string | Translation): Observable<any> {

    const subject = new Subject<any>();
    getMessages(this._translate, message, title)
      .subscribe(([$message, $title]) => {
        subject.next(fn($message, $title));
        subject.complete();
      });

    return subject.asObservable();
  }
}
