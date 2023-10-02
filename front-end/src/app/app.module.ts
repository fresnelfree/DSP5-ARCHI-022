import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CoresModule } from './core/cores.module';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SharedModule } from './shared/shared.module';
import { PagesModule } from './pages/pages.module';
import { TokenInterceptorProvider } from './core/helpers/token/token.interceptor';
 


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    CoresModule,
    SharedModule,
  ],
  providers: [
    TokenInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
