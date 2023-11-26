import { Component, HostListener, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { event } from 'cypress/types/jquery';
import { forEach, toInteger } from 'cypress/types/lodash';
import { Gain } from 'src/app/core/models/gain/gain';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user/user';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { ClientService } from 'src/app/core/services/client/client.service';
import { TokenService } from 'src/app/core/services/token/token.service';
import { GainService } from 'src/app/core/services/gain/gain.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { GainDetailComponent } from '../gain-detail/gain-detail.component';
 

@Component({
  selector: 'app-gain',
  templateUrl: './gain.component.html',
  styleUrls: ['./gain.component.css']
})
export class GainComponent {
  
  //Mini-menu
  titleMenu:string="Informations du client"
  titleList:string="Liste clients"
  linkList = "/dashboard/client/all"
  titleAdd:string="Ajout client"
  linkAdd = "/dashboard/client/new"

 //Variable pour gestion navbar
 public open: boolean = false;
 public block: boolean = false;
 public openMenu: boolean = false;//Le boutton bare
 public smallDevise: boolean = false;//Pour apliquer des styles aux tablettes et smartphones
 public openMenuSmall: boolean = false;//Pour ouvrir le petit menu
 public ecran: number = window.innerWidth; //Pour stocker la taille de la resolution
 //Autres var
 public isLogged: boolean = false;//verification si le user est connecter
 public clients: User[] = [];
 public gains: any = [];
 
 @ViewChild(MatPaginator)
 paginator : any = MatPaginator;

 @ViewChild(MatSort) 
 sort: any = MatSort;

 columnsToDisplay = ['numero_gain', 'etat_gain', 'libelle_gain', 'action' ];

 constructor(
   private authService   : AuthenticationService,
   private router        : Router,
   private token         : TokenService,
   private clientService : ClientService,
   public gainService    : GainService,
   private dialog: MatDialog,
 ){}

 ngOnInit(): void {

    this.authService.authStatus.subscribe(value => this.isLogged = value)
    this.getClients()
    this.getGains()
 }

  getGains(){
   return this.gainService.getGainAll().subscribe(
      (res:any) => {
        this.gains = new MatTableDataSource(res)
        this.gains.paginator = this.paginator;
        this.gains.sort = this.sort;
        console.log(this.gains);
        
      }
    )
  }

  reloadComponent(): void {
    const currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate([currentUrl]);
  }

  showDetailDialog(data:any) {
    const dialogRef = this.dialog.open(GainDetailComponent, {
      data: data,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.reloadComponent()
      // this.animal = result;
    }); 
  } 

  applyFilter(filterValue: any) {
    filterValue = filterValue.value.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.gains.filter = filterValue;
  }

  filter(filterValue:any): void {
    console.log('filter : ', filterValue.value) // Datasource defaults to lowercase matches
    this.gains.filter = filterValue.value
  }

  showDetails(elt: any):void {
      console.log("details")
      this.showDetailDialog(elt)
  }

  getClients(){
    return this.clientService.getClients().subscribe(
      res => {
        this.clients = res
      }
    )
  }


  onGoDetail(id: number){
    
    this.router.navigate(['/dashboard/gain/detail/'+id])
    
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
  }

  logout(event: MouseEvent)
  {
      event.preventDefault();
      this.authService.logout()
  }
}
