import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

      constructor(private router: Router) { }
      // handleToken(token: any){
      //     this.setItem('token',token);     
      // }

      setItem(nomVar: string, value:any){
        localStorage.setItem(nomVar, value);
      }

      removeItem(nomVar: string){
        localStorage.removeItem(nomVar);
      } 
      
      getItem(nomVar: string) : any{
        return localStorage.getItem(nomVar);
      }       

      // getToken(): string | null{
      //   return localStorage.getItem('token');
      // }

      removeToken(){        
        localStorage.removeItem('token');
        localStorage.removeItem('user');
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
          return jwt_decode(token)
        } catch(Error) {
          return null;
        }
        // return JSON.parse(atob(token));
      }
}//Fin token
