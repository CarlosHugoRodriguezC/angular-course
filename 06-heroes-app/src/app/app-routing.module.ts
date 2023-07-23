import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { authCanActivate, authCanMatch } from './guards/auth.guard';
import { publicCanActivate, publicCanMatch } from './guards/public.guard';

const routes: Routes = [
  {
    path: 'auth',
    canMatch: [publicCanMatch],
    canActivate: [publicCanActivate],
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'heroes',
    canActivate: [authCanActivate],
    canMatch: [authCanMatch],
    loadChildren: () =>
      import('./heroes/heroes.module').then((m) => m.HeroesModule),
  },
  {
    path: '404',
    component: Error404PageComponent,
  },
  {
    path: '',
    redirectTo: 'heroes',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
