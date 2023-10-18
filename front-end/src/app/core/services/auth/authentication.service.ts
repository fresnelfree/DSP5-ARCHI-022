import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of } from 'rxjs';
import { TokenService } from '../token/token.service';
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
export class AuthenticationService {
  //VARIABLES
  private  api = environment.hostLine;

  private loggedIn = new BehaviorSubject<boolean>(this.isloggedIn());
  
  public authStatus =  this.loggedIn.asObservable();

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
  //Inscription
  register(obj: any){

      return this.http.post(this.api+"/users/register", obj, httpOption).pipe(

        catchError(this.handleError(`register`, obj))

      )

   }

   //connexion
  login(obj:any){

      return this.http.post(this.api+"/users/login", obj, httpOption).pipe(
        // catchError(this.handleError(`login`, obj))
      )

   } 

   //user est il connecté ?
   isloggedIn(){

     return this.token.isValidToken()

  }
 
  //Status du user
  changeAuthStatus(value: boolean){

     this.loggedIn.next(value)

  }
}
