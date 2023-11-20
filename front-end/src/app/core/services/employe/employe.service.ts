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
  // getEmployers(): Observable<User[]> {
  //   return this.http.get<User[]>(`${this.api}/employes/`).pipe(
  //     catchError(this.handleError('getEmployers', []))
  //   );
  // }

  getEmployers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.api}/employes`).pipe(
      catchError(this.handleError('getEmployers', []))
    );
  }
  

  getEmployesAll(){
    return this.http.get(`${this.api}/comptes/`).pipe(
      catchError(this.handleError(`getEmployesAll : `))
    );
  }

  updateUser(user: any, id:number){
    return this.http.put(`${this.api}/employes/${id}`, user, httpOption).pipe(
      catchError(this.handleError(`updateUser`, user))
    )
  }

  
deleteUser(id:number){
  return this.http.delete(`${this.api}/employes/${id}`, httpOption).pipe(
    catchError(this.handleError(`deleteUser`, id))
  )
}

  getUserById(id: number){
    return this.http.get(`${this.api}/comptes/${id}`).pipe(
      catchError(this.handleError(`getUserById id=${id}`))
    );
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



}//Fin
