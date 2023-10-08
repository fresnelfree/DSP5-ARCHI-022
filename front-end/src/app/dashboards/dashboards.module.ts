import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboards-routing.module';
import { DashboardJeuxComponent } from './dashboard-jeux/dashboard-jeux.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardSidebarComponent } from './shared/dashboard-sidebar/dashboard-sidebar.component';
import { DashboardHeaderComponent } from './shared/dashboard-header/dashboard-header.component';
import { DashboardFooterComponent } from './shared/dashboard-footer/dashboard-footer.component';
import { DashboardClientAllComponent } from './client/dashboard-client-all/dashboard-client-all.component';
 
 

@NgModule({
  declarations: [
    DashboardJeuxComponent,
    DashboardHomeComponent,
    DashboardSidebarComponent,
    DashboardHeaderComponent,
    DashboardFooterComponent,
    DashboardClientAllComponent,
   
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
