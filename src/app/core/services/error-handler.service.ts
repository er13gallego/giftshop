import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { isObject, isArray } from 'util';

import { NotificationService } from './notification.service';
import { Translation } from '../../common/models/translation.model';

function getStatusMessage(status: number): Translation {
  return { key: `errors.${status}` };
}

@Injectable()
export class ErrorHandlerService {

  constructor(private _notificationService: NotificationService) { }

  handle(errorResponse: HttpErrorResponse) {
    const messages = this.getErrorMessages(errorResponse);
    for (const error of messages) {
      this._notificationService.error(error);
    }
  }

  getErrorMessages(errorResponse: HttpErrorResponse): Array<Translation | string> {
    const errors = [];
    switch (errorResponse.status) {
      case 0:
      case 401:
      case 403:
      case 404:
      case 500:
      case 504:
        errors.push(getStatusMessage(errorResponse.status));
        break;
      case 400:
        if (isObject(errorResponse.error)) {
          const values = Object.values(errorResponse.error);
          const concat = Array.prototype.concat;
          const merged = concat.apply([], values);
          merged.forEach(error => {
            errors.push(error);
          });
        } else {
          errors.push(getStatusMessage(errorResponse.status));
        }
        break;
      default:
        if (isArray(errorResponse.error)) {
          errorResponse.error.forEach(error => {
            errors.push(error.description);
          });
        } else {
          if (typeof errorResponse.error === 'string') {
            errors.push(errorResponse.error);
          } else {
            errors.push({ key: 'errors.CODE', arg: { code: errorResponse.status } });
          }
        }
        break;
    }

    return errors;
  }
}
