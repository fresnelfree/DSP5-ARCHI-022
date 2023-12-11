
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of } from 'rxjs';
import { TokenService } from '../token/token.service';
import { environment } from 'src/environments/environment.dev';
import { tap } from 'cypress/types/lodash';
import { User } from '../../models/user/user';

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

export class ClientService {
  //VARIABLES
  private  api = environment.hostLine;

  //CONSTRUCTEUR
  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
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
    getClients(): Observable<User[]> {
      return this.http.get<User[]>(`${this.api}/clients`).pipe(
        catchError(this.handleError('getClients', []))
      );
    }

    getClientCount(): any {
      return this.http.get(`${environment.hostLine}/clients/count`)
    }
    
    getClientById(id: number){
      return this.http.get(`${this.api}/clients/${id}`).pipe(
        catchError(this.handleError(`getClientById id=${id}`))
      );
    }
  
    updateClient(client: any, id:number){
      return this.http.put(`${this.api}/clients/${id}`, client, httpOption).pipe(
        catchError(this.handleError(`updateClient`, client))
      )
    }

    deleteClient(id:number){
      return this.http.delete(`${this.api}/clients/${id}`, httpOption).pipe(
        catchError(this.handleError(`deleteUser`, id))
      )
    }
     
    getUserByEmail(email: string){
      return this.http.get(`${this.api}/compteWithEmail/${email}`).pipe(
        catchError(this.handleError(`getUserByEmail email=${email}`))
      );
    }
  
    getTokenEmail() {
      const ob: any = this.tokenService.decodeToken(this.tokenService.getItem('token'))
      const value = ob.email;
      return value
    }
}
