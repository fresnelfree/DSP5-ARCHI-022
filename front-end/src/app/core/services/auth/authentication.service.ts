import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of } from 'rxjs';
import { TokenService } from '../token/token.service';
import { environment } from 'src/environments/environment.dev';
import { User } from '../../models/user/user';
import { map } from 'cypress/types/bluebird';
import { Router } from '@angular/router';


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
    private userSubject: BehaviorSubject<User | null>;
    public user: Observable<User | null>;

    //CONSTRUCTEUR
    constructor(
        private http: HttpClient,
        private router: Router,
        private tokenService: TokenService,
      ) { 
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
      }

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
  //   public get userValue() {
  //     return this.userSubject.value;
  // }

    userValue() {
      return this.userSubject.value;
  }
    //Inscription
    register(obj: any){
        return this.http.post(this.api+"/users/register", obj, httpOption).pipe(
          catchError(this.handleError(`register`, obj))
        )
    }

    //connexion
    login(obj:any){
        return this.http.post<any>(this.api+"/users/login", obj, httpOption)
    } 

     //Logout
    logout(){
      this.changeAuthStatus(false);
      this.tokenService.removeToken();
      this.router.navigate(['/connexion']).then(() => {
        window.location.reload();
      });
    }
    //user est il connecté ?
    isloggedIn(){
      return this.tokenService.isValidToken()
    }
  
    //Status du user
    changeAuthStatus(value: boolean){
      this.loggedIn.next(value)
    }
}
