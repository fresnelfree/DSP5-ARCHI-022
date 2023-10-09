import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboards-routing.module';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardSidebarComponent } from './shared/dashboard-sidebar/dashboard-sidebar.component';
import { DashboardHeaderComponent } from './shared/dashboard-header/dashboard-header.component';
import { DashboardFooterComponent } from './shared/dashboard-footer/dashboard-footer.component';
import { DashboardClientAllComponent } from './client/dashboard-client-all/dashboard-client-all.component';
import { DashboardClientDetailComponent } from './client/dashboard-client-detail/dashboard-client-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardJeuxDetailComponent } from './jeux/dashboard-jeux-detail/dashboard-jeux-detail.component';
import { DashboardJeuxAllComponent } from './jeux/dashboard-jeux-all/dashboard-jeux-all.component';
import { DashboardJeuxNewComponent } from './jeux/dashboard-jeux-new/dashboard-jeux-new.component';
import { DashboardEmployeNewComponent } from './employe/dashboard-employe-new/dashboard-employe-new.component';
import { DashboardEmployeAllComponent } from './employe/dashboard-employe-all/dashboard-employe-all.component';
import { DashboardEmployeDetailComponent } from './employe/dashboard-employe-detail/dashboard-employe-detail.component';
import { DhbCardStatComponent } from './components/dhb-card-stat/dhb-card-stat.component';
import { DhbChartComponent } from './components/dhb-chart/dhb-chart.component';
import { DhbTable1Component } from './components/dhb-table1/dhb-table1.component';
import { DhbProfilComponent } from './components/dhb-profil/dhb-profil.component';
import { DhbCardStatJeuxComponent } from './components/dhb-card-stat-jeux/dhb-card-stat-jeux.component';
 
 

@NgModule({
  declarations: [
    DashboardHomeComponent,
    DashboardSidebarComponent,
    DashboardHeaderComponent,
    DashboardFooterComponent,
    DashboardClientAllComponent,
    DashboardClientDetailComponent,
    DashboardJeuxDetailComponent,
    DashboardJeuxAllComponent,
    DashboardJeuxNewComponent,
    DashboardEmployeNewComponent,
    DashboardEmployeAllComponent,
    DashboardEmployeDetailComponent,
    DhbCardStatComponent,
    DhbChartComponent,
    DhbTable1Component,
    DhbProfilComponent,
    DhbCardStatJeuxComponent,
   
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class DashboardModule { }
