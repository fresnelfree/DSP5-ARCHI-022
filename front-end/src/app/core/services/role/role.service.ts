import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(
    private cookieService: CookieService
  ) { }

    handleRole(role: any){
      this.setRole(role)
  }

  setRole(role: any){
    // localStorage.setItem('role', role);
    this.cookieService.set('role', role)
  }

  getRole(): string | null{
    return this.cookieService.get('role')
  }

  removeRole(){
    this.cookieService.delete('role');
  }


}
