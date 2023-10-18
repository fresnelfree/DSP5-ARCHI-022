import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';






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
