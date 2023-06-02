import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Category } from 'src/app/common/models/category.model';
import { Color } from 'src/app/common/models/color.model';
import { Size } from 'src/app/common/models/size.model';
import { ExamplesService } from 'src/app/examples/services/examples.service';

@Component({
  selector: 'app-product-add-edit',
  templateUrl: './product-add-edit.component.html',
  styleUrls: ['./product-add-edit.component.scss'],
})
export class ProductAddEditComponent implements OnInit {
  cats: any = [];
  sizes: any = [];
  cols: any = [];
  action: string;

  cat: Category = new Category();
  col: Color = new Color();
  size: Size = new Size();

  productForm = this.fb.group({
    name: [''],
    color: [''],
    cat: [''],
    size: [''],
    stock: [''],
    price: [''],
    status: [1],
    pic_url: [''],
  });

  constructor(
    public dialogRef: MatDialogRef<ProductAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _examplesService: ExamplesService
  ) {
    this.dialogRef.disableClose = true;

    let input = this.data.data;
    this.cols = input[0].objects;
    this.cats = input[1].objects;
    this.sizes = input[2].objects;

    if (this.data.prod != null) {
      let prod = this.data.prod;

      this.productForm.controls['name'].setValue(prod.name);
      this.productForm.controls['color'].setValue(prod.color);
      this.productForm.controls['cat'].setValue(prod.cat);
      this.productForm.controls['size'].setValue(prod.size);
      this.productForm.controls['stock'].setValue(prod.stock);
      this.productForm.controls['price'].setValue(prod.price);
      this.productForm.controls['status'].setValue(prod.status);
      this.productForm.controls['pic_url'].setValue(prod.pic_url);
    }
  }

  ngOnChanges() {}

  ngOnInit() {
    if (this.data.action == 1) {
      this.action = 'Add';
    } else {
      this.action = 'Update';
    }
  }

  changeValue(type: number, id: string) {
    if (type == 1) {
      this.cats.forEach(ele => {
        if (ele.id == id) {
          this.productForm.controls['cat'].setValue(ele.id);
        }
      });
    } else if (type == 2) {
      this.sizes.forEach(ele => {
        if (ele.id == id) {
          this.productForm.controls['size'].setValue(ele.id);
        }
      });
    } else if (type == 3) {
      this.cols.forEach(ele => {
        if (ele.id == id) {
          this.productForm.controls['color'].setValue(ele.id);
        }
      });
    }
  }

  submit() {
    if (this.data.action == 1) {
      this.addProduct();
    } else {
      this.updateProduct();
    }
  }

  addProduct() {
    this._examplesService
      .save(this.productForm.value, 'product')
      .subscribe(res => {
        this.dialogRef.close({
          res: true
        });
      });
  }

  updateProduct() {
    this._examplesService
      .update(this.data.prod.id, this.productForm.value, 'product')
      .subscribe(res => {
        this.dialogRef.close({
          res: true
        });
      });
  }

  close() {
    this.dialogRef.close({
      res: false
    });
  }
}
