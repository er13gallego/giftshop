import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { VERSION } from '../../../../environments/version';

@Component({
  selector: 'app-version',
  template: `{{ 'app.VERSION' | translate: version }}`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VersionComponent implements OnInit {

  version = VERSION;

  constructor() { }

  ngOnInit() {
  }

}
