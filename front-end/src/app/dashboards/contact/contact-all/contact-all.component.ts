import { Component, HostListener, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { ContactService } from 'src/app/core/services/contact/contact.service';
import { EmployeService } from 'src/app/core/services/employe/employe.service';
import { TokenService } from 'src/app/core/services/token/token.service';


@Component({
  selector: 'app-contact-all',
  templateUrl: './contact-all.component.html',
  styleUrls: ['./contact-all.component.css']
})
export class ContactAllComponent {


  titleMenu:string="Contact Message"
  titleList:string="Messages"
  linkList = "/dashboard/contact/all"
  titleAdd:string="Ajout contact"
  linkAdd = "/dashboard/contact/new"

 //Variable pour gestion navbar
 public open: boolean = false;
 public block: boolean = false;
 public openMenu: boolean = false;//Le boutton bare
 public smallDevise: boolean = false;//Pour apliquer des styles aux tablettes et smartphones
 public openMenuSmall: boolean = false;//Pour ouvrir le petit menu
 public ecran: number = window.innerWidth; //Pour stocker la taille de la resolution
 //Autres var
 public isLogged: boolean = false;//verification si le user est connecter
//  public employes: User[] = []
public contacts: any;

@ViewChild(MatPaginator)
paginator : any = MatPaginator;

@ViewChild(MatSort)
sort: any = MatSort;
columnsToDisplay = ['nom','phone','email','objet', 'message' ];

 constructor(
   private authService : AuthenticationService,
   private router      : Router,
   private token       : TokenService,
   private contactService : ContactService
 ){}

 ngOnInit(): void {
    this.authService.authStatus.subscribe(value => this.isLogged = value)
    this.getNewsletters()
 }


 applyFilter(filterValue: any) {
  filterValue = filterValue.value.trim(); // Remove whitespace
  filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
  this.contacts.filter = filterValue;
}

getNewsletters(){
  return this.contactService.getContacts().subscribe(
     (res:any) => {
      this.contacts = new MatTableDataSource(res)
      this.contacts.paginator = this.paginator;
      this.contacts.sort = this.sort;
      // console.log("contacts : ", this.contacts)
     }
    )
}


/********************************************************************
 *
 ********************************************************************/
 @HostListener('window:resize', ['$event'])
 onResize(event: Event): void {
   this.ecran = window.innerWidth;

   if (this.ecran < 1010) {
     this.smallDevise = !this.smallDevise;
   }
 }


 onMenu(e: MouseEvent) {
   if (this.ecran > 1010)
    {
      this.open = !this.open;
    }
    else if (this.ecran < 1010)
    {
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
