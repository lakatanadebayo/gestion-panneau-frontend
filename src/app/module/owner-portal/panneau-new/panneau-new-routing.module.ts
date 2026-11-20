import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {PanneauNewComponent} from "../../../component/panneau-new/panneau-new.component";


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {path: '', component: PanneauNewComponent}
    ])
  ],
  exports: [RouterModule]
})
export class PanneauNewRoutingModule { }
