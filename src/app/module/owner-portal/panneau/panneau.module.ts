import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import {PanneauRoutingModule} from "./panneau-routing.module";
import {PanneauComponent} from "../../../component/panneau/panneau.component";
import {UserModule} from "../../admin-portal/user/user.module";


@NgModule({
  declarations: [
    PanneauComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    PanneauRoutingModule,
    UserModule
  ]
})
export class PanneauModule { }
