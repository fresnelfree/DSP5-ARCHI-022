import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToggleService {

  public toggle : boolean = false;

  constructor() { }

  

 
  bars(e:MouseEvent, v:boolean){
    e.preventDefault()

    v = !v;   
  }

}
