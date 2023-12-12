import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from 'express';

@Component({
  selector: 'app-apropos',
  templateUrl: './apropos.component.html',
  styleUrls: ['./apropos.component.css']
})
export class AproposComponent {
  constructor(
    private titleApropos: Title,
    private meta: Meta
  ) {
    this.titleApropos.setTitle("A-Propos");
    this.meta.addTag({name:'Deuxième page', content:'A-propos'});
    this.meta.addTag({name:'keywords', content:'Thé, thés bios, TheTipTop, produits, clients'})
  }
}
