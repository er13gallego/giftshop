import { Component, OnInit, OnDestroy } from '@angular/core';

import { ComponentBase } from '../../common/component-base';
import { PaginatedResult } from '../../common/models/paginated-result.model';
import { PaginatedRequest } from '../../common/models/paginated-request.model';
import { ExamplesService } from '../services/examples.service';
import { Example } from '../../common/models/example.model';
import { MessageBoxService } from '../../core/services/message-box.service';
import { ErrorHandlerService } from '../../core/services/error-handler.service';

@Component({
  selector: 'app-example-list',
  templateUrl: './example-list.component.html',
  styleUrls: ['./example-list.component.scss'],
})
export class ExampleListComponent extends ComponentBase
  implements OnInit, OnDestroy {
  private _paginatedRequest: PaginatedRequest = {};
  page: PaginatedResult<Example>;

  constructor(
    private _examplesService: ExamplesService,
    private _messageBox: MessageBoxService,
    private _errorHandler: ErrorHandlerService
  ) {
    super();
  }

  ngOnInit() {
    // this.getPage(1);
  }

  getPage(page: number) {
    this._paginatedRequest.page = page;
    this.registerRequest(
      this._examplesService.getPage(this._paginatedRequest)
    ).subscribe((response) => {
      this.page = response;
    });
  }

  sort(value: string) {
    this._paginatedRequest.orderBy = value;
    this.getPage(this._paginatedRequest.page);
  }

  delete(example: Example) {
    this._messageBox
      .confirm(
        { key: 'examples.CONFIRM_DELETE', arg: { name: example.name } },
        'examples.DELETE'
      )
      .subscribe((result: boolean) => {
        if (result) {
          this._examplesService.delete(example.id).subscribe(
            () => {
              this.getPage(1);
            },
            error => this._errorHandler.handle(error)
          );
        }
      });
  }
}
