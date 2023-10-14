import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of } from 'rxjs';
import { TokenService } from '../token/token.service';
import { environment } from 'src/environments/environment.dev';
import { tap } from 'cypress/types/lodash';
import { User } from '../../models/user/user';
import { Jeux } from '../../models/jeux/jeux';

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
export class JeuxService {

    //VARIABLES
    private  api = environment.hostLine;



    //CONSTRUCTEUR
    constructor(
        private http: HttpClient,
        private token: TokenService,
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
     *        METHODES SESSIONS 
     ************************************************/
        //AddUser
        addSession(obj: any){

          return this.http.post(this.api+"/session-jeus", obj, httpOption).pipe(
            
            catchError(this.handleError(`addSession`, obj))
    
          )
    
      }

  
      getSessions(): Observable<Jeux[]> {

      return this.http.get<Jeux[]>(this.api+"/session-jeus").pipe(

        catchError(this.handleError(`getJeuxs`, []))

      );
    }

    countSession(){

      return this.http.get(this.api+"/session-jeus/count").pipe(

        catchError(this.handleError(`countSession`, []))

      );
    }


       /************************************************
     *        METHODES REPARTITIONS 
     ************************************************/




      /************************************************
     *        METHODES GAINS 
     ************************************************/

}
