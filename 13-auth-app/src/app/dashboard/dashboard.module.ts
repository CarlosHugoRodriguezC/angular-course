import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayouComponent } from './layouts/dashboard-layou/dashboard-layou.component';


@NgModule({
  declarations: [
    DashboardLayouComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
