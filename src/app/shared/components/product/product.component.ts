import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ComponentBase } from 'src/app/common/component-base';
import { PaginatedRequest } from 'src/app/common/models/paginated-request.model';
import { PaginatedResult } from 'src/app/common/models/paginated-result.model';
import { Product } from 'src/app/common/models/product.model';
import { ExamplesService } from 'src/app/examples/services/examples.service';
import { InfoModalComponent } from '../../dialogs/info-modal/info-modal.component';
import { ProductAddEditComponent } from '../../dialogs/product-add-edit/product-add-edit.component';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { Cart } from 'src/app/common/models/cart.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent extends ComponentBase implements OnInit {
  @Input() cats: any;
  @Input() colors: any;
  @Input() sizes: any;
  @Input() filters: any;
  @Input() paginatedRequest: any;

  private _paginatedRequest: PaginatedRequest = {};
  page: PaginatedResult<Product>;
  products: any[];
  prods = Array();

  constructor(
    private _examplesService: ExamplesService,
    private _loginService: AuthService,
    public dialog: MatDialog // private _messageBox: MessageBoxService,
  ) // private _errorHandler: ErrorHandlerService,
  {
    super();
  }

  ngOnInit() {
    this._paginatedRequest = this.paginatedRequest;
    this.getProducts(1);
  }

  getProducts(page: number) {
    this._paginatedRequest.page = page;
    this._paginatedRequest.pageSize = 10;
    this.registerRequest(
      this._examplesService.getPage(this._paginatedRequest, 'product')
    ).subscribe(
      res => {
        this.products = res.items;
        this.products.forEach(async ele => {
          await this.getSize(ele.size, ele);
          await this.getCat(ele.cat, ele);
          await this.getColor(ele.color, ele);
        });

        console.log(this.products);
      },
      err => {
        this.products = [];
      }
    );
  }

  getSize(id: string, product: any) {
    this._examplesService.get(id, 'size').subscribe(res => {
      product.sizeName = res.sizeLetter;
    });
  }

  getCat(id: string, product: any) {
    this._examplesService.get(id, 'category').subscribe(res => {
      product.catName = res.name;
    });
  }

  getColor(id: string, product: any) {
    this._examplesService.get(id, 'color').subscribe(res => {
      product.colorName = res.name;
    });
  }

  delete(prod: any) {
    const dialog = this.dialog.open(InfoModalComponent, {
      data: prod,
    });

    dialog.afterClosed().subscribe(res => {
      if (res.res == true) {
        this.ngOnInit();
      }
    });
  }

  abrirDialogo(prod: any) {
    console.log(this.filters);
    const dialog = this.dialog.open(ProductAddEditComponent, {
      width: '450px',
      data: {
        data: this.filters,
        action: 2,
        prod: prod,
      },
    });

    dialog.afterClosed().subscribe(res => {
      if (res.res == true) {
        this.ngOnInit();
      }
    });
  }

  addQty(prod: any) {
    let maxNum = prod.stock;

    if (prod.qty == null || Number.isNaN(prod.qty)) prod.qty = 0;
    
    if (prod.qty >= maxNum) return false;
    else prod.qty++;
  }

  subQty(prod: any) {
    let minNum = 0;

    if (prod.qty == 0) return false;
    else prod.qty--;
  }

  addToCart(prod: any) {
    const max = prod.stock;
    const prodTemp = Object.assign({}, prod);

    if (this.prods.some(p => p.id == prodTemp.id)) {
      console.log("Sí tiene");
      this.prods.forEach(ele => {
        if (ele.id == prodTemp.id) {
          if ((ele.qty + prodTemp.qty > max)) {
            console.log("Ñao Ñao");
          } else {
            ele.qty += prodTemp.qty;
          }
        }
      });
    } else {
      console.log("No tiene");
      this.prods.push(prodTemp);
    }
    
    console.log(this.prods);
  }

}
