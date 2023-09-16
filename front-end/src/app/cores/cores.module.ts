import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './services/user.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './data/data-user';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';

import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { AuthenticationService } from './services/authentication-service.service';




@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    CommonModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation : false}),
  ],
  providers: [
      UserService,
      AuthenticationService,
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },

      // provider used to create fake backend

   ]
})
export class CoresModule { }
