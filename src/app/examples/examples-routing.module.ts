import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExampleListComponent } from './example-list/example-list.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  {
    path: 'products',
    component: ExampleListComponent
  },
  {
    path: 'cart',
    component: CartComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamplesRoutingModule {}
