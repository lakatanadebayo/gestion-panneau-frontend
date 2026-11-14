import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {InscriptionComponent} from "../../component/inscription/inscription.component";


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {path: '', component: InscriptionComponent}
    ])
  ],
  exports: [RouterModule]
})
export class UserRoutingModule { }
