import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../services/auth/authentication.service';
import { TokenService } from '../../services/token/token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      
      const token = this.tokenService.getToken()

      // Cloner la demande et remplacer les en-têtes originaux par des en-têtes clonés
      // si on a un token on met le tonken dans le clone headers.
      
      if(token !== null){
        const clone = request.clone({
          headers: request.headers.set('Authorization', 'Bearer '+token)
        });
        
        return next.handle(clone);
      }

    //   return next.handle(clone).pipe(
    //     catchError(err => {
    //        if(err.status === 401) {
    //         this.tokenService.removeToken()
    //        }
    //        return throwError('Session a expiré ou vous n\'ête pas connecter.')
    //     })
    //   )
    // }
      
      //sinon on retourne la requete
      return next.handle(request);
  }
}


export const TokenInterceptorProvider = {
  provide : HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi: true
}