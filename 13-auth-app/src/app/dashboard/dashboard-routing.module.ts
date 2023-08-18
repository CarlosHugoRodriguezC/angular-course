import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayouComponent } from './layouts/dashboard-layou/dashboard-layou.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayouComponent,
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
