import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { ComponentBase } from '../../common/component-base';
import { PaginatedResult } from '../../common/models/paginated-result.model';
import { PaginatedRequest } from '../../common/models/paginated-request.model';
import { ExamplesService } from '../services/examples.service';
import { Example } from '../../common/models/example.model';
import { MessageBoxService } from '../../core/services/message-box.service';
import { ErrorHandlerService } from '../../core/services/error-handler.service';
import { MatDialog } from '@angular/material';
import { ProductAddEditComponent } from 'src/app/shared/dialogs/product-add-edit/product-add-edit.component';
import { ProductComponent } from 'src/app/shared/components/product/product.component';
import { FiltersComponent } from 'src/app/shared/dialogs/filters/filters.component';

@Component({
  selector: 'app-example-list',
  templateUrl: './example-list.component.html',
  styleUrls: ['./example-list.component.scss'],
})
export class ExampleListComponent extends ComponentBase
  implements OnInit, OnDestroy {
  @ViewChild(ProductComponent, null) productCom: ProductComponent;
  private _paginatedRequest: PaginatedRequest = {};
  page: PaginatedResult<Example>;

  toggleFilt: any = [false, false, false];

  products: any = [];
  categories: any = [];
  colors: any = [];
  sizes: any = [];

  filters: any = [];

  constructor(
    private _examplesService: ExamplesService,
    private _messageBox: MessageBoxService,
    private _errorHandler: ErrorHandlerService,
    public dialog: MatDialog
  ) {
    super();
  }

  ngOnInit() {
    this.getColor(1);
    this.getCategories(1);
    this.getSizes(1);
  }

  getColor(page: number) {
    this._paginatedRequest.page = page;
    this.registerRequest(
      this._examplesService.getPage(this._paginatedRequest, 'color')
    ).subscribe(
      res => {
        this.page = res;
        this.colors = res.items;
        this.filters[0] = {
          name: 'Colors',
          objects: this.colors,
        };
      },
      err => {
        this.filters[0] = {};
      }
    );
  }

  getCategories(page: number) {
    this._paginatedRequest.page = page;
    this.registerRequest(
      this._examplesService.getPage(this._paginatedRequest, 'category')
    ).subscribe(
      res => {
        this.page = res;
        this.categories = res.items;
        this.filters[1] = {
          name: 'Categories',
          objects: this.categories,
        };
      },
      err => {
        this.filters[1] = {};
      }
    );
  }

  getSizes(page: number) {
    this._paginatedRequest.page = page;
    this.registerRequest(
      this._examplesService.getPage(this._paginatedRequest, 'size')
    ).subscribe(
      res => {
        this.page = res;
        this.sizes = res.items;
        this.filters[2] = {
          name: 'Sizes',
          objects: this.sizes,
        };
      },
      err => {
        this.filters[2] = {};
      }
    );
  }

  sort(value: string) {
    this._paginatedRequest.orderBy = value;
  }

  openAddProd() {
    console.log(this.filters);

    const dialogo1 = this.dialog.open(ProductAddEditComponent, {
      width: '450px',
      data: {
        data: this.filters,
        action: 1,
        prod: null,
      },
    });

    dialogo1.afterClosed().subscribe(res => {
      console.log(res);

      if (res.res == true) {
        console.log('Todo fine pa');

        this.productCom.ngOnInit();
      }
    });
  }

  openFilters() {
    const dialog = this.dialog.open(FiltersComponent, {
      width: '460px',
      data: this.filters
    });

    dialog.afterClosed()
    .subscribe(res => {
      if (res == true) {
        this.ngOnInit();
      }
    })
  }

  search(eve) {
    let value = eve.srcElement.value;
    if (eve.key === "Enter") {
      this._paginatedRequest.term = value;
      this.productCom.ngOnInit();
    }
  }
}