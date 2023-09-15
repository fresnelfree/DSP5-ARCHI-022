import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { User } from '../class/user/user';
import { USERS } from '../data/mock-user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private apiUrl ='api/users/'

  constructor(private http: HttpClient) {}



  // getUsers(): User[] {
  //   return USERS;
  // }

  getUsers(): Observable<User[]> {
     return this.http.get<User[]>(this.apiUrl).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error)
      })
     )
  }
}
