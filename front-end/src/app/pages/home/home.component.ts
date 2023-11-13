import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  

  constructor(
    private router : Router,
    private titleAccueil: Title,
    private meta: Meta
  ) { 
    this.titleAccueil.setTitle('Accueil');
    this.meta.addTag({name:'Premier page', content:'Home'});
    this.meta.addTag({name:'keywords', content:'Thé, thés bios, TheTipTop, Nice, Jeu Concours, thé vert, thé noir, infusions'});
  }

}
