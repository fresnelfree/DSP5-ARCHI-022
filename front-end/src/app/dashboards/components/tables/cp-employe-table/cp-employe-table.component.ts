import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user/user';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { EmployeService } from 'src/app/core/services/employe/employe.service';
import { TokenService } from 'src/app/core/services/token/token.service';

@Component({
  selector: 'app-cp-employe-table',
  templateUrl: './cp-employe-table.component.html',
  styleUrls: ['./cp-employe-table.component.css']
})
export class CpEmployeTableComponent {

  public isLogged: boolean = false;//verification si le user est connecter
  public employes: User[] = []

  
 constructor(

  private authService : AuthenticationService,
  private router      : Router,
  private token       : TokenService,
  private employeService : EmployeService

){}

ngOnInit(): void {
   this.authService.authStatus.subscribe(value => this.isLogged = value)
   this.getEmployes()
}


/********************************************************************
*           USERS
********************************************************************/

getEmployes(){
   return this.employeService.getEmployers("/employes").subscribe(
     (res) =>  {
          this.employes = res
      }
   )
}


}
