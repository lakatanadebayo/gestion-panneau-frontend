import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import {LocationComponent} from "../../../component/location/location.component";
import {LocationRoutingModule} from "./location-routing.module";
import {UserModule} from "../../admin-portal/user/user.module";


@NgModule({
  declarations: [
    LocationComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    LocationRoutingModule,
    UserModule
  ]
})
export class LocationModule { }
