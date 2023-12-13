import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-mentions',
  templateUrl: './mentions.component.html',
  styleUrls: ['./mentions.component.css']
})
export class MentionsComponent {
  constructor(
    private titleMentions: Title,
    private meta: Meta
  ) {
    this.titleMentions.setTitle('Mentions');
    this.meta.updateTag({name:'Page Mentions Légales', content:'Mentions'});
    this.meta.updateTag({name:'keywords', content:'Contactez-nous, The Tip Top, Conditions Générales, Utilisateur, informations personnelles'});
    this.meta.updateTag ({name:'robots', content:'index, follow'});
    this.meta.updateTag({name:'description', content:'Page Mentions Légales'})
  }
}
