import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import {OwnerPortalComponent} from "../../component/owner-portal/owner-portal.component";
import {OwnerPortalRoutingModule} from "./owner-portal-routing.module";
import {FooterModule} from "../footer/footer.module";
import {TopMenuModule} from "../top-menu/top-menu.module";


@NgModule({
  declarations: [
    OwnerPortalComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    OwnerPortalRoutingModule,
    FooterModule,
    TopMenuModule
  ]
})
export class OwnerPortalModule { }
