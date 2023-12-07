import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { Session } from './session';
import { environment } from 'src/environments/environment.dev';
import { Observable, catchError, of } from 'rxjs';
import { User } from '../../models/user/user';
import { SharedFun } from '../shared/sharedFun';

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
export class SessionService {

  private  api = environment.hostLine;
  // public headers: HttpHeaders
  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private sharedFun: SharedFun
  ) { }


  /************************************************
  *        METHODES UTILES
  ************************************************/
  private log(log: string){
    console.info(log)
    }

    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.error(error);
        this.log(`${operation} failed: ${error.message}`);
        return of(result as T);
      };
    }

  /************************************************
  *        METHODES
  ************************************************/
  AddNewSession(data:Session):any {
    // data.id_employe = 10
    data.statut = "Creer"
    data.date_debut = this.sharedFun.FormatDate(data.date_debut)
    data.date_fin = this.sharedFun.FormatDate(data.date_fin)
    return this.http.post(`${environment.hostLine}/session-jeus`,data,httpOption)
  }

  UpdateSession(data:Session):any {
    // data.id_employe = 10
    data.date_debut = this.sharedFun.FormatDate(data.date_debut)
    data.date_fin = this.sharedFun.FormatDate(data.date_fin)
    return this.http.patch(`${environment.hostLine}/session-jeus/${data.id}`,data,httpOption)
  }

  GetSessionByID(id:number):any {
    // data.id_employe = 10
    return this.http.get(`${environment.hostLine}/session-jeus/${id}`,httpOption)
  }

  GetrepByID(id:number):any {
    // data.id_employe = 10
    return this.http.get(`${environment.hostLine}/session-jeus/${id}`,httpOption)
  }

  getSession() {
    return this.http.get(`${this.api}/session-jeus`).pipe(
      catchError(this.handleError('getSession', []))
    );
  }

  getClients(): Observable<User[]> {
    return this.http.get<User[]>(`${this.api}/clients`).pipe(
      catchError(this.handleError('getClients', []))
    );
  }

}
