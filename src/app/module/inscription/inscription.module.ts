import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import {UserRoutingModule} from "../admin-portal/user/user-routing.module";
import {InscriptionComponent} from "../../component/inscription/inscription.component";


@NgModule({
  declarations: [
    InscriptionComponent
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
export class InscriptionModule { }
