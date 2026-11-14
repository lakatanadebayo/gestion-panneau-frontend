import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {AppComponent} from "./app.component";
import {TopMenuModule} from "./module/top-menu/top-menu.module";
import {HomeModule} from "./module/home/home.module";
import {AuthenticationModule} from "./module/authentication/authentication.module";
import {ToastrModule} from "ngx-toastr";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./core/interceptors/auth.interceptor";
import {UserModule} from "./module/admin-portal/user/user.module";
import {InscriptionModule} from "./module/inscription/inscription.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxPaginationModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      timeOut: 3000,
      closeButton: true,
      progressBar: true,
    }),
    TopMenuModule,
    HomeModule,
    AuthenticationModule,
    UserModule,
    InscriptionModule
  ],
  providers: [provideAnimationsAsync(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
