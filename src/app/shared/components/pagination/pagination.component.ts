import { Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

import { PaginatedResult } from '../../../common/models/paginated-result.model';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent {

  private _page: PaginatedResult<any>;
  @Input() set page(value: PaginatedResult<any>) {
    this._page = value;
    if (value && value.total > 0) {
      this.from = (value.current - 1) * value.pageSize + 1;
      this.to = Math.min(value.current * value.pageSize, value.total);
    } else {
      this.from = 0;
      this.to = 0;
    }
  }
  get page(): PaginatedResult<any> {
    return this._page;
  }
  from: number;
  to: number;

  @Output() pageChange = new EventEmitter<number>();
}
