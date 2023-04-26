import { Pipe, PipeTransform } from '@angular/core';

import { TranslatePipe } from '@ngx-translate/core';

@Pipe({
  name: 'enum'
})
export class EnumPipe extends TranslatePipe implements PipeTransform {

  transform(value: any, namespace: string): any {
    if (value === null || value === undefined) {
      return null;
    }

    if (!namespace) {
      throw new Error('Resource namespace is required.');
    }

    const resource = namespace + '.' + value;
    return super.transform(resource);
  }
}
