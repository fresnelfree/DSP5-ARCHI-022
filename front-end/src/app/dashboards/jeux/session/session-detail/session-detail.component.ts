import { Component, HostListener, OnInit, ViewChild ,AfterViewInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/models/user/user';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { ToggleService } from 'src/app/core/services/toggle/toggle.service';
import { TokenService } from 'src/app/core/services/token/token.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {MatPaginator, MatPaginatorIntl} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { SessionService } from 'src/app/core/services/session/session.service';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];
@Component({
  selector: 'app-session-detail',
  templateUrl: './session-detail.component.html',
  styleUrls: ['./session-detail.component.css'],
  // providers: [{provide: MatPaginatorIntl}],
})
export class SessionDetailComponent implements OnInit,AfterViewInit{

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


//
displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
dataSource: any = [];
dataSourceG: any = [];

  @ViewChild(MatPaginator)
  paginator! : MatPaginator;

  @ViewChild(MatPaginator)
  paginatorG! : MatPaginator;
  columnsToDisplay = ['name', 'username', 'email', ];

 constructor(

  private authService : AuthenticationService,
  private router: Router,
  private token : TokenService,
  private fb : FormBuilder,
  private activatedRoute : ActivatedRoute,
  private userService : UserService,
  private sessionsService: SessionService
  // private paginator : MatPaginator
 ){
  // this.dataSource.paginator = this.paginator;
  // this.dataSource.paginator =paginatorS
 }

 ngOnInit(): void {
  console.log('debut')
  this.getSessionsByID()
  this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  this.dataSourceG = new MatTableDataSource([
    {name: "1", username: 'Hydrogen', email: "1.0079", website: 'H'},
    {name: "2", username: 'Hydrogen', email: "1.0079", website: 'H'},
    {name: "3", username: 'Hydrogen', email: "1.0079", website: 'H'},
    {name: "5", username: 'Hydrogen', email: "1.0079", website: 'H'},
    {name: "6", username: 'Hydrogen', email: "1.0079", website: 'H'},
    {name: "7", username: 'Hydrogen', email: "1.0079", website: 'H'},
    {name: "8", username: 'Hydrogen', email: "1.0079", website: 'H'},
    {name: "9", username: 'Hydrogen', email: "1.0079", website: 'H'},
  ]);
  // this.dataSource.paginator = this.paginator;
}
 ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
  this.dataSourceG.paginator = this.paginatorG;
}

getSessionsByID():void {
  this.sessionsService.GetSessionByID(1).
  subscribe(
    (res:any) => {
      console.log("sessions : ",res)
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
 }

 logout(event: MouseEvent)
  {
    event.preventDefault();
    this.authService.logout()
  }



}
