import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import {AdminPortalComponent} from "../../component/admin-portal/admin-portal.component";
import {AdminPortalRoutingModule} from "./admin-portal-routing.module";
import {FooterModule} from "../footer/footer.module";
import {TopMenuModule} from "../top-menu/top-menu.module";


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
    AdminPortalRoutingModule,
    FooterModule,
    TopMenuModule
  ]
})
export class AdminPortalModule { }
