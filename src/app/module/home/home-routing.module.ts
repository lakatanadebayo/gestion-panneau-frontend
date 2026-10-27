import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {HomeComponent} from "../../component/home/home.component";


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {path: '', component: HomeComponent}
    ])
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
