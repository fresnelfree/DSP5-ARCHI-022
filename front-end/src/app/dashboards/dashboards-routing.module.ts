import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../core/guards/auth.guard';
import { JeuxComponent } from '../pages/jeux/jeux.component';
import { DashboardJeuxComponent } from './dashboard-jeux/dashboard-jeux.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';

const routes: Routes = [
  // { path: '', component: HomeComponent},
  // { path: 'dashboard', component: HomeComponent},

  { path: '', component: DashboardHomeComponent},
  { path: 'home', component: DashboardHomeComponent},
  { path: 'dashboard', component: DashboardHomeComponent},
  { path: 'jeux', component: DashboardJeuxComponent},
 

  
  // {
  //   path: 'client', children: [
  //     { path : '', component: ClientListComponent},
  //     { path : 'all', component: ClientListComponent},
  //     { path : 'edit', component: ClientEditComponent},
  //     { path : 'detail', component: ClientDetailComponent}
  //   ]
  // },
  // {
  //   path: 'employe', children: [
  //     { path : '', component: EmployeListComponent},
  //     { path : 'all', component: EmployeListComponent},
  //     { path : 'edit', component: EmployeEditComponent},
  //     { path : 'detail', component: EmployeDetailComponent}
  //   ]
  // },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
