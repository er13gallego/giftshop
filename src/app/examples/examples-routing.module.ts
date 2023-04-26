import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExampleListComponent } from './example-list/example-list.component';
import { ExampleEditComponent } from './example-edit/example-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ExampleListComponent,
  },
  {
    path: 'new',
    component: ExampleEditComponent,
  },
  {
    path: ':id/edit',
    component: ExampleEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamplesRoutingModule {}
