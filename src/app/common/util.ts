import { isArray, isObject, isDate } from 'util';
import { Dictionary } from './models/dictionary.model';
import { Observable, Subject, throwError } from 'rxjs';

function append(model: any, formData: FormData, prefix: string) {
  if (model === null || model === undefined) {
    return;
  }

  if (isArray(model)) {
    for (let i = 0; i < model.length; i++) {
      const item = model[i];
      append(item, formData, prefix + `[${i}]`);
    }
  } else if (isObject(model)) {
    if (prefix) {
      prefix = prefix + '.';
    }
    for (const prop in model) {
      if (model.hasOwnProperty(prop)) {
        const value = model[prop];
        append(value, formData, prefix + prop);
      }
    }
  } else {
    formData.append(prefix, model);
  }
}

export function modelToFormData(model: any, file: File): FormData {
  const formData = new FormData();
  if (file) {
    formData.append('file', file, file.name);
  }

  append(model, formData, '');

  return formData;
}

function encodeInternal(model: any, parts: string[], prefix: string) {
  if (model === null || model === undefined /*|| model === emptyValue*/) {
    return;
  }

  if (isArray(model)) {
    for (let i = 0; i < model.length; i++) {
      const item = model[i];
      encodeInternal(item, parts, prefix + `[${i}]`);
    }
  // } else if (moment.isMoment(model)) {
  //   parts.push(`${prefix}=${encodeURIComponent(model.toJSON())}`);
  } else if (isObject(model)) {
    if (prefix) {
      prefix = prefix + '.';
    }
    for (const prop in model) {
      if (model.hasOwnProperty(prop)) {
        const value = model[prop];
        encodeInternal(value, parts, prefix + encodeURIComponent(prop));
      }
    }
  } else {
    parts.push(`${prefix}=${encodeURIComponent(model.toString())}`);
  }
}

export function urlEncode(model: any[] | Dictionary) {
  const parts = [];
  encodeInternal(model, parts, '');
  if (parts.length > 0) {
    return '?' + parts.join('&');
  }

  return '';
}

export function toObject<T>(items: T[], key: string, valueSelector?: (v: T) => any): Dictionary<T> {
  if (!valueSelector) {
    valueSelector = x => x;
  }
  return items.reduce<any>((map, item: T) => {
    map[item[key]] = valueSelector(item);
    return map;
  }, {});
}

export function sum<T>(items: T[], accessor: (item: T) => number): number {
  if (items.length === 0) {
    return 0;
  }

  return items.reduce((acc, item) => acc + (accessor(item) || 0), 0);
}

export function groupBy<T>(items: T[], key: string): Dictionary<T[]> {
  return items.reduce((map, item: T) => {
    const value = item[key];
    (map[value] = map[value] || []).push(item);
    return map;
  }, {});
}

export function getPreview(file: File): Observable<any> {
  if (!file) {
    this._previewData = null;
    return throwError('No image to preview.');
  }

  const mimeType = file.type;
  if (mimeType.match(/image\/*/) == null) {
    return throwError('File is not an image.');
  }

  const subject = new Subject<any>();
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (_event) => {
    subject.next(reader.result);
  };

  return subject.asObservable();
}

export function dateToString(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function pad(n: number): string {
  if (n < 10) {
    return '0' + n;
  }
  return '' + n;
}

const DATE_REGEX = /^(\d{4})-(\d{2})-(\d{2})/;

export function parseDate(s: any): Date {
  if (typeof s === 'string') {
    const m = DATE_REGEX.exec(s as string);
    if (m) {
      return new Date(parseInt(m[1], 10), parseInt(m[2], 10) - 1, parseInt(m[3], 10));
    }
    throw new Error(`Unexecpected date format: ${s}`);
  }
  if (isDate(s)) {
    return s;
  }
  throw new Error('Unexecpected date value');
}
