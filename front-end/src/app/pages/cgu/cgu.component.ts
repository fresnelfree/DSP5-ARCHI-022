import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cgu',
  templateUrl: './cgu.component.html',
  styleUrls: ['./cgu.component.css']
})
export class CguComponent {

  constructor(
    private router: Router,
    private titleUtilisation: Title,
    private meta: Meta
    ){
    this.titleUtilisation.setTitle('Conditions générales');
    this.meta.updateTag({name:"Page de Conditions générales", content:'Utilisation'});
    this.meta.updateTag({name:'keywords', content:'jeu concours, tambolo'});
    this.meta.updateTag ({name:'robots', content:'index, follow'});
    this.meta.updateTag({name:'description', content:'Page de Conditions générales'})
  }

}
