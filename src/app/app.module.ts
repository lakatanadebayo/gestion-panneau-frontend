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
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
