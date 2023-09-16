import { Injectable } from '@angular/core';
import { Observable, of, throwError} from 'rxjs';
import { User } from '../class/user/user';
import { USERS } from '../data/mock-user';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

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

export class UserService {
  private apiUrl ='api/users/'

  constructor(private http: HttpClient) {}

    /***********************************************
   * Gestion des erreurs
   * *********************************************/
  private log(log: string) {
    console.info(log);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /***********************************************
   * Methodes des services HTTP
   * *********************************************/





    login2(email: string, password: string) {
      return this.http.post<any>(`${this.apiUrl}`, { email, password })
          .pipe(map(user => {
              // // login successful if there's a jwt token in the response
              // if (user && user.token) {
              //     // store user details and jwt token in local storage to keep user logged in between page refreshes
              //     localStorage.setItem('currentUser', JSON.stringify(user));
              //     this.currentUserSubject.next(user);
              // }

              if(user){
                console.log(user.email, user.id);
              }
              return user;
          }));
  }







  // getUsers(): Observable<User[]> {
  //    return this.http.get<User[]>(this.apiUrl).pipe(
  //     // Si succes
  //     tap(() => {this.log('All Users récupérés avec succès.'); }),

  //     //Si erreur
  //       catchError(this.handleError<User[]>('getUsers', []))
  //    );
  // }

  // getUser(id: number): Observable<User> {
  //   return this.http.get<User>(`${this.apiUrl}${id}`).pipe(

  //     tap(_ => this.log(`Recherche du user email=${id}`)),

  //     catchError(this.handleError<User> (`getUser email=${id}`))
  //   );
  // }


} //Fin du service
