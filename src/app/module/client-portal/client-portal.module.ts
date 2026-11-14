import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import {ClientPortalComponent} from "../../component/client-portal/client-portal.component";
import {ClientPortalRoutingModule} from "./client-portal-routing.module";


@NgModule({
  declarations: [
    ClientPortalComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ClientPortalRoutingModule
  ]
})
export class ClientPortalModule { }
