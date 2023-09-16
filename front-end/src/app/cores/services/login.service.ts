import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { User } from '../class/user/user';
import { USERS } from '../data/mock-user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
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

  getUsers(): Observable<User[]> {
     return this.http.get<User[]>(this.apiUrl).pipe(
      // Si succes
      tap(() => {this.log('Users récupérés avec succès.'); }),

      //Si erreur
        catchError(this.handleError<User[]>('getUsers', []))
     );
  }

  getUser(code: any): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${code}`).pipe(

      tap(_ => this.log(`Recherche du user name=${code}`)),

      catchError(this.handleError<User> (`getUser name=${code}`))
    );
  }


} //Fin du service
