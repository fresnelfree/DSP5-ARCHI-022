import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';






@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    CommonModule,
    // HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation : false}),
  ],
  providers: []
})
export class CoresModule { }
