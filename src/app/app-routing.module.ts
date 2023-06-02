import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './shared/components/layout/layout.component';
import { ErrorComponent } from './error/error.component';
import { AuthGuard } from './core/guards/auth.guard';
import { MainComponent } from './main/main.component';
import { LoggedGuard } from './core/guards/logged.guard';

const routes: Routes = [
  {
    path: 'auth',
    component: LayoutComponent,
    loadChildren: './auth/auth.module#AuthModule',
    // canActivate: [LoggedGuard]
  },
  {
    path: '',
    component: MainComponent,
    loadChildren: './examples/examples.module#ExamplesModule',
    data: {
      title: 'app.HOME',
    },
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
