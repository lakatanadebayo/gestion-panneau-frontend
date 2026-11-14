import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import {AdminPortalComponent} from "../../component/admin-portal/admin-portal.component";
import {AdminPortalRoutingModule} from "./admin-portal-routing.module";


@NgModule({
  declarations: [
    AdminPortalComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    AdminPortalRoutingModule
  ]
})
export class AdminPortalModule { }
