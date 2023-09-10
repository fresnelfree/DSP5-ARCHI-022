import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboards-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContentComponent } from './content/content.component';
import { ClientListComponent } from './clients/client-list/client-list.component';
import { ClientEditComponent } from './clients/client-edit/client-edit.component';
import { ClientGainComponent } from './clients/client-gain/client-gain.component';
import { ClientDetailComponent } from './clients/client-detail/client-detail.component';
import { EmployeListComponent } from './employes/employe-list/employe-list.component';
import { EmployeEditComponent } from './employes/employe-edit/employe-edit.component';
import { EmployeDetailComponent } from './employes/employe-detail/employe-detail.component';
import { JeuLitsComponent } from './jeux/jeu-lits/jeu-lits.component';
import { JeuEditComponent } from './jeux/jeu-edit/jeu-edit.component';
import { JeuDetailComponent } from './jeux/jeu-detail/jeu-detail.component';
import { JeuCreateComponent } from './jeux/jeu-create/jeu-create.component';




@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    ClientListComponent,
    ClientEditComponent,
    ClientGainComponent,
    ClientDetailComponent,
    EmployeListComponent,
    EmployeEditComponent,
    EmployeDetailComponent,
    JeuLitsComponent,
    JeuEditComponent,
    JeuDetailComponent,
    JeuCreateComponent,

  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
