import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // constructor() {}

  getLogin(){
    return [
      {name:'MALADHO', age:20},
      {name:'ASMA', age:19},
      {name:'Minna', age:21},
      {name:'FATIMA', age:19},
    ]
  }

}
