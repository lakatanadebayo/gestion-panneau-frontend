import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import {ClientPortalComponent} from "../../component/client-portal/client-portal.component";
import {ClientPortalRoutingModule} from "./client-portal-routing.module";
import {FooterModule} from "../footer/footer.module";
import {TopMenuModule} from "../top-menu/top-menu.module";


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
    ClientPortalRoutingModule,
    FooterModule,
    TopMenuModule
  ]
})
export class ClientPortalModule { }
