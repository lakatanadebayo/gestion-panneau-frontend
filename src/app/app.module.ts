import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {AppComponent} from "./app.component";
import {TopMenuModule} from "./module/top-menu/top-menu.module";
import {HomeModule} from "./module/home/home.module";

@NgModule({
  imports: [
    AppComponent,
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxPaginationModule,
    TopMenuModule,
    HomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
