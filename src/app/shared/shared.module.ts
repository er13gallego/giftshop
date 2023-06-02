import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import {
  NgbPaginationModule,
  NgbDatepickerModule,
  NgbTimepickerModule,
  NgbProgressbarModule,
  NgbModalModule,
  NgbTypeaheadModule,
  NgbDateAdapter,
  NgbDateNativeAdapter,
  NgbDropdownModule,
} from '@ng-bootstrap/ng-bootstrap';

import { FileComponent } from './components/file/file.component';
import { AutofocusDirective } from './directives/autofocus.directive';
import { EmailDirective } from './directives/email.directive';
import {
  TablesortDirective,
  TablesortColDirective,
} from './directives/tablesort.directive';
import { EnumPipe } from './pipes/enum.pipe';
import { YesNoPipe } from './pipes/yes-no.pipe';
import { PanelComponent } from './components/panel/panel.component';
import { TitleComponent } from './components/title/title.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { LayoutComponent } from './components/layout/layout.component';
import { VersionComponent } from './components/version/version.component';
import { DatetimepickerComponent } from './components/datetimepicker/datetimepicker.component';

import {
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  MatProgressSpinnerModule,
} from '@angular/material';
import { CardComponent } from './components/card/card.component';
import { ProductComponent } from './components/product/product.component';
import { ProductAddEditComponent } from './dialogs/product-add-edit/product-add-edit.component';
import { InfoModalComponent } from './dialogs/info-modal/info-modal.component';
import { FiltersComponent } from './dialogs/filters/filters.component';
import { CartComponent } from '../examples/cart/cart.component';

const imports = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  TranslateModule,
  NgbDatepickerModule,
  NgbTimepickerModule,
  NgbProgressbarModule,
  NgbModalModule,
  NgbTypeaheadModule,
  NgbDropdownModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  MatProgressSpinnerModule
  
];

const declarations = [
  FileComponent,
  PanelComponent,
  TitleComponent,
  PaginationComponent,
  DatepickerComponent,
  LayoutComponent,
  VersionComponent,
  DatetimepickerComponent,
  CardComponent,
  AutofocusDirective,
  EmailDirective,
  TablesortDirective,
  TablesortColDirective,
  EnumPipe,
  YesNoPipe,
  ProductComponent,
  ProductAddEditComponent,
  InfoModalComponent,
  FiltersComponent
];

@NgModule({
  declarations: [...declarations],
  imports: [...imports, RouterModule, NgbPaginationModule],
  exports: [...declarations, ...imports],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}],
  entryComponents: [ProductAddEditComponent, InfoModalComponent, FiltersComponent]
})
export class SharedModule {}
