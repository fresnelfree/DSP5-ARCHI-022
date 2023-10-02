import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboards-routing.module';
import { HomeComponent } from './home/home.component';
import { DashboardJeuxComponent } from './dashboard-jeux/dashboard-jeux.component';
 

@NgModule({
  declarations: [
    HomeComponent,
    DashboardJeuxComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
