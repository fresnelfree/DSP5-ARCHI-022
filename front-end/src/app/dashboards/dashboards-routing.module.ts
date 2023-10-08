import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../core/guards/auth.guard';
import { JeuxComponent } from '../pages/jeux/jeux.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardClientAllComponent } from './client/dashboard-client-all/dashboard-client-all.component';
import { DashboardClientDetailComponent } from './client/dashboard-client-detail/dashboard-client-detail.component';
import { DashboardJeuxAllComponent } from './jeux/dashboard-jeux-all/dashboard-jeux-all.component';
import { DashboardJeuxDetailComponent } from './jeux/dashboard-jeux-detail/dashboard-jeux-detail.component';
import { DashboardEmployeAllComponent } from './employe/dashboard-employe-all/dashboard-employe-all.component';
import { DashboardEmployeDetailComponent } from './employe/dashboard-employe-detail/dashboard-employe-detail.component';
import { DashboardEmployeNewComponent } from './employe/dashboard-employe-new/dashboard-employe-new.component';
import { DashboardJeuxNewComponent } from './jeux/dashboard-jeux-new/dashboard-jeux-new.component';

const routes: Routes = [
  { path: '', component: DashboardHomeComponent},
  { path: 'home', component: DashboardHomeComponent},
  { path: 'dashboard', component: DashboardHomeComponent},

  {
    path: 'jeux', children: [
      { path : '', component: DashboardJeuxAllComponent},
      { path : 'all', component: DashboardJeuxAllComponent},
      { path : 'new', component: DashboardJeuxNewComponent},
      { path : 'detail', component: DashboardJeuxDetailComponent}
    ]
  },
  {
    path: 'client', children: [
      { path : '', component: DashboardClientAllComponent},
      { path : 'all', component: DashboardClientAllComponent},
      { path : 'detail', component: DashboardClientDetailComponent}
    ]
  },
  {
    path: 'employe', children: [
      { path : '', component: DashboardEmployeAllComponent},
      { path : 'all', component: DashboardEmployeAllComponent},
      { path : 'new', component: DashboardEmployeNewComponent},
      { path : 'detail', component: DashboardEmployeDetailComponent}
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
