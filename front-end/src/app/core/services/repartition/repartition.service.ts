import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repartition } from './repartition';
import { environment } from 'src/environments/environment.dev';

//Hedaer Option
const httpOption = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
  })
};
@Injectable({
  providedIn: 'root'
})
export class RepartitionService {

  constructor(
    private http: HttpClient
  ) {

   }

   AddNewParticipationGains(data:Repartition[]):any {
    // console.log('dataSend : ', data);
    return this.http.post(`${environment.hostLine}/repartitions`,data,httpOption)
   }

   GetRepartionGains(id:number):any {
    // data.id_employe = 10
    return this.http.get(`${environment.hostLine}/repartitions/${id}`,httpOption)
  }

   GetStatsRepartition():any {
    // data.id_employe = 10
    return this.http.get(`${environment.hostLine}/stats/`,httpOption)
  }

}
