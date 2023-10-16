import { Component, OnInit } from '@angular/core';
import { Jeux } from 'src/app/core/models/jeux/jeux';
import { JeuxService } from 'src/app/core/services/jeux/jeux.service';

@Component({
  selector: 'app-dhb-card-stat-jeux',
  templateUrl: './dhb-card-stat-jeux.component.html',
  styleUrls: ['./dhb-card-stat-jeux.component.css']
})
export class DhbCardStatJeuxComponent implements OnInit {
  public sessions: Jeux[] = []
  public nbrSession:number = 0

  constructor(  private jeuxService: JeuxService){}

  ngOnInit(): void {
      this.getSession()
  }

  getSession(){

    this.jeuxService.getSessions().subscribe(

     res => {
       this.sessions = res
       this.nbrSession =  this.sessions.length
     }
    )
  }

}
