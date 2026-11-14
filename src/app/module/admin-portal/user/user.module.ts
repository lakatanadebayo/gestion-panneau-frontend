import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserComponent} from "../../../component/user/user.component";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import {UserRoutingModule} from "./user-routing.module";
import {UserFilterPipe} from "../../../pipe/user-filter.pipe";



@NgModule({
  declarations: [
    UserComponent,
    UserFilterPipe
  ],
  exports: [
    UserFilterPipe
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    UserRoutingModule
  ]
})
export class UserModule { }
