import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {PanneauComponent} from "../../../component/panneau/panneau.component";



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {path: '', component: PanneauComponent}
    ])
  ],
  exports: [RouterModule]
})
export class PanneauRoutingModule { }
