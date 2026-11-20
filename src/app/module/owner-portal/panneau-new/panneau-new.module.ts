import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import {UserModule} from "../../admin-portal/user/user.module";
import {PanneauNewRoutingModule} from "./panneau-new-routing.module";
import {PanneauNewComponent} from "../../../component/panneau-new/panneau-new.component";


@NgModule({
  declarations: [
    PanneauNewComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    PanneauNewRoutingModule,
    UserModule
  ]
})
export class PanneauNewModule { }
