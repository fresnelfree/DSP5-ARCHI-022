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
import { DashboardStatisticComponent } from './dashboard-statistic/dashboard-statistic.component';
import { SessionComponent } from './jeux/session/session.component';
import { GainComponent } from './jeux/gain/gain.component';

const routes: Routes = [
  { 
    path: '', component: DashboardHomeComponent,               
    canActivate: [authGuard], 
    data: {role: 'Admin'}  
  },
  { path: 'home', component: DashboardHomeComponent,         
     canActivate: [authGuard], data: {role: 'Admin', role2: 'Caissier'}  
  },
  { path: 'dashboard', component: DashboardHomeComponent,      
    canActivate: [authGuard], 
    data: {role: 'Admin'} 
  },
  { path: 'statistic', component: DashboardStatisticComponent, 
    canActivate: [authGuard], 
    data: {role: 'Caissier'}
  },

  {
    path: 'jeux', children: [
      { path : '', component: DashboardJeuxAllComponent,
       canActivate: [authGuard], 
       data: {role: 'Admin'} 
      },
      { path : 'all', component: DashboardJeuxAllComponent,
        canActivate: [authGuard], 
        data: {role: 'Admin'} 
      },
      { path : 'new', component: DashboardJeuxNewComponent,
        canActivate: [authGuard], 
        data: {role: 'Admin'}  
       },
      { path : 'detail', component: DashboardJeuxDetailComponent,
        canActivate: [authGuard], 
        data: {role: 'Admin'} 
      }
    ]
  },
  {
    path: 'session', children: [
      { path : '', component: SessionComponent,
        canActivate: [authGuard], 
        data: {role: 'Admin'} 
      },
      { path : 'all', component: SessionComponent,
        canActivate: [authGuard], 
        data: {role: 'Admin'} 
       },
    ]
  },
  {
    path: 'gain', children: [
      { path : '', component: GainComponent,
        canActivate: [authGuard], 
        data: {role: 'Admin'} 
       },
      { path : 'all', component: GainComponent,
        canActivate: [authGuard], 
        data: {role: 'Admin'} 
    },
    ]
  },
  {
    path: 'client', children: [
      { path : '', component: DashboardClientAllComponent,
        canActivate: [authGuard], 
        data: {role: 'Admin'} 
    },
      { path : 'all', component: DashboardClientAllComponent,
        canActivate: [authGuard], 
        data: {role: 'Admin'} 
    },
      { path : 'detail/:id', component: DashboardClientDetailComponent,
        canActivate: [authGuard], 
        data: {role: 'Admin'} 
    }
    ]
  },
  {
    path: 'employe', children: [
      { path : '', component: DashboardEmployeAllComponent,
        canActivate: [authGuard], 
        data: {role: 'Admin'} 
    },
      { path : 'all', component: DashboardEmployeAllComponent,
        canActivate: [authGuard], 
        data: {role: 'Admin'} 
    },
      { path : 'new', component: DashboardEmployeNewComponent,
        canActivate: [authGuard], 
        data: {role: 'Admin'} 
    },
    { path : 'detail', component: DashboardEmployeDetailComponent,
        canActivate: [authGuard], 
        data: {role: 'Admin'} 
    }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
