import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientListComponent } from './clients/client-list/client-list.component';
import { ClientEditComponent } from './clients/client-edit/client-edit.component';
import { ClientDetailComponent } from './clients/client-detail/client-detail.component';
import { EmployeListComponent } from './employes/employe-list/employe-list.component';
import { EmployeEditComponent } from './employes/employe-edit/employe-edit.component';
import { EmployeDetailComponent } from './employes/employe-detail/employe-detail.component';
import { authGuard } from '../cores/guards/auth.guard';

const routes: Routes = [
  { path: '', component: DashboardComponent,  canActivate:[authGuard]},
  { path: 'dashboard', component: DashboardComponent,  canActivate:[authGuard]},
  {
    path: 'client', children: [
      { path : '', component: ClientListComponent},
      { path : 'all', component: ClientListComponent},
      { path : 'edit', component: ClientEditComponent},
      { path : 'detail', component: ClientDetailComponent}
    ]
  },
  {
    path: 'employe', children: [
      { path : '', component: EmployeListComponent},
      { path : 'all', component: EmployeListComponent},
      { path : 'edit', component: EmployeEditComponent},
      { path : 'detail', component: EmployeDetailComponent}
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
