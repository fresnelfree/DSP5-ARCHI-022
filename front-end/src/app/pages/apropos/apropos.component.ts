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
    this.meta.updateTag({name:'Deuxième page', content:'A-propos'});
    this.meta.updateTag({name:'keywords', content:'Thé, thés bios, TheTipTop, produits, clients'});
    this.meta.updateTag ({name:'robots', content:'index, follow'});
    this.meta.updateTag({name:'description', content:'Apprenez un peu plus de THETIPTOP'})
  }
}
