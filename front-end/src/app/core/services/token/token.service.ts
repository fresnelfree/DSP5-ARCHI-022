import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class TokenService {
      constructor(
        private router: Router,
        private cookieService: CookieService
      ) { }
      // handleToken(token: any){
      //     this.setItem('token',token);
      // }

      setItem(nomVar: string, value:any){
        // localStorage.setItem(nomVar, value);
        this.cookieService.set(nomVar, value)
      }

      removeItem(nomVar: string){
        // localStorage.removeItem(nomVar);
        this.cookieService.delete(nomVar)
      }

      getItem(nomVar: string) : any{
        return this.cookieService.get(nomVar);
      }

      // getToken(): string | null{
      //   return localStorage.getItem('token');
      // }

      removeToken(){
        this.cookieService.delete('token');
        this.cookieService.delete('user');
        this.cookieService.delete('role');
        this.cookieService.delete('role2');
        this.cookieService.delete('role3');
      }

      // removeTokenExpired(){
      //   localStorage.removeItem('token');
      //   localStorage.removeItem('user');
      //   this.router.navigate(['/connexion'])
      // }

      isValidToken(){
        const token = this.getItem('token');
        if(token){
          const payload = this.decodeToken(token);
          if(payload){
            // return payload.iat === environment.hostLine ? true : false
            return true;
          }
        }
        return false;
      }

      //le token seule en chaine de caracter
      payloadToken(token:any){
        const payload = token.split('.')[1];
        return payload;
      }

      decodeToken(token:any)
      {
        try {
          return JSON.parse(jwt_decode(token))
        } catch(Error) {
          return null;
        }
        // return JSON.parse(atob(token));
      }
}//Fin token
