import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';

import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { AuthenticationService } from './services/auth/authentication.service';




@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    CommonModule,
    // HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation : false}),
  ],
  providers: [
      AuthenticationService,
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },

      // provider used to create fake backend

   ]
})
export class CoresModule { }
