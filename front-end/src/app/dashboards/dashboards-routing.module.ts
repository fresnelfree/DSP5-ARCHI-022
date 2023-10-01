import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../core/guards/auth.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent,  canActivate:[authGuard]},
  { path: 'dashboard', component: HomeComponent,  canActivate:[authGuard]},
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
