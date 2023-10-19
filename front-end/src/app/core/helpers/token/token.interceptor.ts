import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { TokenService } from '../../services/token/token.service';
import { Router } from '@angular/router';
import { error } from 'cypress/types/jquery';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService,
    private router: Router
    ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      
    const token = this.tokenService.getItem('token')

      // Cloner la demande et remplacer les en-têtes originaux par des en-têtes clonés
      // si on a un token on met le tonken dans le clone headers.
      
      if(token !== null){
        const clone = request.clone({
          headers: request.headers.set('Authorization', 'Bearer '+token)
        });
        
        return next.handle(clone).pipe(
          catchError(err => {
            if(err.status === 401 || err.status === 500 ) 
            {
              this.tokenService.removeToken();
              // this.router.navigate(['/connexion']);
            }
            const err_message= new Error('Session a expiré ou vous n\'ête pas connecter.'); 
            return throwError(() => err_message);
          })
        );
      }
      
      //sinon on retourne la requete
      return next.handle(request);
  }
}


export const TokenInterceptorProvider = {
  provide : HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi: true
}