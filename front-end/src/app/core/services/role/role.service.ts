import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  // constructor() { }

    handleRole(role: any){
      this.setRole(role)     
  }

  setRole(role: any){
    localStorage.setItem('role', role);
  }

  getRole(): string | null{
    return localStorage.getItem('role');
  }

  removeRole(){
    localStorage.removeItem('role');
  }

  
}
