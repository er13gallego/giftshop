import { Pipe, PipeTransform } from '@angular/core';

import { TranslatePipe } from '@ngx-translate/core';

@Pipe({
  name: 'yesNo'
})
export class YesNoPipe extends TranslatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch (value) {
      case true:
        return super.transform('app.YES');
      case false:
      return super.transform('app.NO');
      default:
        return value;
    }
  }

}
