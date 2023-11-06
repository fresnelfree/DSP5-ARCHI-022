import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-jeux-detail',
  templateUrl: './dashboard-jeux-detail.component.html',
  styleUrls: ['./dashboard-jeux-detail.component.css']
})
export class DashboardJeuxDetailComponent {
  titleMenu:string="Jeux"
  titleList:string="Liste jeu"
  linkList = "/dashboard/jeux/all"
  titleAdd:string="Ajout session"
  linkAdd = "/dashboard/jeux/new"
}
