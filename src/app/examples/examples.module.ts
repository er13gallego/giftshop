import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ExamplesRoutingModule } from './examples-routing.module';
import { ExampleListComponent } from './example-list/example-list.component';
import { ExamplesService } from './services/examples.service';
import { ExampleEditComponent } from './example-edit/example-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [ExampleListComponent, ExampleEditComponent, CartComponent],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ExamplesRoutingModule,
  ],
  providers: [ExamplesService],
  entryComponents: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ExamplesModule {}
