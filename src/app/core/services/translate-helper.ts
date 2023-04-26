import { Observable, of, forkJoin } from 'rxjs';
import { delay } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

import { Translation } from '../../common/models/translation.model';

export function getMessages(service: TranslateService, ...messages: Array<string | Translation>): Observable<string[]> {
  return forkJoin(messages.map(x => getMessage(service, x)))
    .pipe(
      // Need to add this delay to ensure the observable will run asynchronously
      delay(1));
}

export function getMessage(service: TranslateService, message: string | Translation): Observable<string> {
  if (message === null || message === undefined) {
    return of('');
  }

  if (typeof message === 'string') {
    return service.get(message);
  }

  const translation = message as Translation;
  return service.get(translation.key, translation.arg);
}
