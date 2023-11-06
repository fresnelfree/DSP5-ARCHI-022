import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { TokenService } from '../token/token.service';
import { environment } from 'src/environments/environment.dev';
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
export class EmployeService {
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
*        METHODES
************************************************/
  getEmployers(path:string): Observable<User[]> {
    return this.http.get<User[]>(this.api+path).pipe(
      catchError(this.handleError('getUserAll', []))
    );
  }
  

  getEmployesAll(){
    return this.http.get(`${this.api}/comptes/`).pipe(
      catchError(this.handleError(`getEmployesAll : `))
    );
  }


}//Fin
