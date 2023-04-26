import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

const knownErrors = [0, 404, 500, 504];

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: []
})
export class ErrorComponent {

  status: any;
  knownError = false;

  constructor(route: ActivatedRoute) {
    const status = parseInt(route.snapshot.queryParams.status, 10);
    if (typeof status === 'number') {
      this.status = status;
      if (knownErrors.includes(status)) {
        this.knownError = true;
      }
    }
  }

}
