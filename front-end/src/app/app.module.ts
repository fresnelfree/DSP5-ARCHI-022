import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CoresModule } from './core/cores.module';
import { TokenInterceptorProvider } from './core/helpers/token/token.interceptor';
import {NgChartsModule } from 'ng2-charts';
import { AuthInterceptorProvider } from './core/helpers/auth/auth.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotifyComponent } from './shared/notify/notify.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
@NgModule({
  declarations: [
    AppComponent,
    NotifyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    CoresModule,
    NgChartsModule,
    MatSnackBarModule,
    MatTableModule, MatPaginatorModule,
  ],
  providers: [
    TokenInterceptorProvider,
    AuthInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
