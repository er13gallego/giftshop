import { Injectable, Component } from '@angular/core';

import { NgbModal, NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Observable, from } from 'rxjs';

import { Translation } from '../../common/models/translation.model';
import { getMessages } from './translate-helper';


@Component({
  template: `
  <div class="modal-header">
    <h4 class="modal-title">{{title}}</h4>
    <button type="button" class="close" [attr.aria-label]="'app.CLOSE' | translate" (click)="close(false)">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p>{{message}}</p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-dark" (click)="close(true)" ngbAutofocus>{{ 'app.OK' | translate }}</button>
  </div>
  `
})
export class ModalMessageComponent {
  message: string;
  data: any;
  title: any;

  constructor(private activeModal: NgbActiveModal) { }

  close(value?: any) {
    this.activeModal.close(value);
  }
}

@Component({
  template: `
  <div class="modal-header">
    <h4 class="modal-title">{{title}}</h4>
    <button type="button" class="close" [attr.aria-label]="'app.CLOSE' | translate" (click)="close(false)">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p>{{message}}</p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-dark" (click)="close(true)">{{ 'app.OK' | translate }}</button>
    <button type="button" class="btn btn-outline-dark" (click)="close(false)" ngbAutofocus>{{ 'app.CANCEL' | translate }}</button>
  </div>
  `,
  styleUrls: []
})
export class ModalConfirmComponent {

  title: string;
  message: string;
  data: any;

  constructor(private activeModal: NgbActiveModal) { }

  close(value?: any) {
    this.activeModal.close(value);
  }
}

const modalOptions: NgbModalOptions = {
  backdrop: 'static',
  keyboard: false
};

@Injectable()
export class MessageBoxService {

  constructor(
    private _ngbModal: NgbModal,
    private _translate: TranslateService) {

  }

  show(message: string | Translation, title?: string | Translation): Observable<boolean> {
    return this._show(ModalMessageComponent, message, title);
  }

  confirm(message: string | Translation, title?: string | Translation): Observable<boolean> {
    return this._show(ModalConfirmComponent, message, title);
  }

  private _show(content: any, message: string | Translation, title?: string | Translation): Observable<any> {
    const modalRef = this._ngbModal.open(content, modalOptions);
    getMessages(this._translate, message, title)
      .subscribe(([$message, $title]) => {
        modalRef.componentInstance.message = $message;
        modalRef.componentInstance.title = $title;
      });

    return from(modalRef.result);
  }
}
