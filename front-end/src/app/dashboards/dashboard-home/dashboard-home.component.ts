import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { forEach } from 'cypress/types/lodash';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { ClientService } from 'src/app/core/services/client/client.service';
import { RepartitionService } from 'src/app/core/services/repartition/repartition.service';
import { ToggleService } from 'src/app/core/services/toggle/toggle.service';
import { TokenService } from 'src/app/core/services/token/token.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent  implements OnInit{
  //Variable pour gestion navbar
  public open: boolean = false;
  public block: boolean = false;
  public openMenu: boolean = false;//Le boutton bare
  public smallDevise: boolean = false;//Pour apliquer des styles aux tablettes et smartphones
  public openMenuSmall: boolean = false;//Pour ouvrir le petit menu
  public ecran: number = window.innerWidth; //Pour stocker la taille de la resolution
  public windowSize: { width: number; height: number } = { width: 0, height: 0 };;
  public currentUser:any;
  public isLogged: boolean = false;//verification si le user est connecter

  stats: any
  nbr_clt: number = 0 
  nbr_ticket_gagne: number = 0  

  @ViewChild(MatPaginator)
  paginator : any = MatPaginator;
  
  columnsToDisplay = ['produit','quantite','active','inactive'];
  constructor(

    private authService : AuthenticationService,
    private router      : Router,
    private token       : TokenService,
    private toggleService : ToggleService,
    private repartitionService: RepartitionService,
    private clientService: ClientService
  ){}

  ngOnInit(): void {
     this.authService.authStatus.subscribe(value => this.isLogged = value)
     this.toggleService.getWindowSizeObservable().subscribe(size => {
      this.windowSize = size;
    });
    this.getCurrentUser()
    this.getStats()
  }

  getStats():any{
    this.repartitionService.GetStatsRepartition()
    .subscribe((res:any) => {
      res.forEach((elt:any) => {
        this.nbr_ticket_gagne = this.nbr_ticket_gagne + elt.actif
      });
      this.stats = new MatTableDataSource(res)
      this.stats.paginator = this.paginator;
      console.log(res)
    })
    this.clientService.getClientCount().subscribe(
      (res:any) => {
        this.nbr_clt = res.count
      }
    )
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.ecran = window.innerWidth;
    if (this.ecran < 1010) {
      this.smallDevise = !this.smallDevise;
    }
  }

  onMenu(e: MouseEvent) {
    if (this.ecran > 1010) {
      this.open = !this.open;
    } else if (this.ecran < 1010) {
      this.openMenu = !this.openMenu;
      if (this.ecran < 576) {
        this.openMenuSmall = !this.openMenuSmall;
      }
    }

    this.toggleService.getWindowSizeObservable().subscribe(size => {
      this.windowSize = size;});
  }

  logout(event: MouseEvent)
  {
    event.preventDefault();
    this.authService.logout()
  }

  // Gestion du user actuell
  getCurrentUser(){
     this.currentUser = this.authService.userValue()
  }


}
