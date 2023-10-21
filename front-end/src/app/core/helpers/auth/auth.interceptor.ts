import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { error } from 'cypress/types/jquery';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // return next.handle(request).pipe(
    //    catchError((error: HttpErrorResponse) => {
    //      if(error.status === 401)
    //      {
    //         console.log("Depuis interceptor on a cette erreur");
            
    //      }
    //     //  return throwError(error);
    //     // const err = new Error('test'); 
    //     return throwError(() => error);
        
    //    })
    // );//fin pipe
    return next.handle(request)
  }

  
}


export const AuthInterceptorProvider = {
  provide : HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
}