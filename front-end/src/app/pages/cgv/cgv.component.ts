import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cgv',
  templateUrl: './cgv.component.html',
  styleUrls: ['./cgv.component.css']
})
export class CgvComponent {

  constructor(
    private router: Router,
    private titleReglement: Title,
    private meta: Meta
    ){
    this.titleReglement.setTitle('Réglement du jeu');
    this.meta.updateTag({name:"Page du réglement de jeu", content:'Réglement'});
    this.meta.updateTag({name:'keywords', content:'jeu concours, tambolo'});
    this.meta.updateTag ({name:'robots', content:'index, follow'});
    this.meta.updateTag({name:'description', content:'Nous mettons à votre disposition des réglements à prendre en compte afin de participer au jeu concours'})
  }

}
