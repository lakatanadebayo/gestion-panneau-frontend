import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {LocationComponent} from "../../../component/location/location.component";


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {path: '', component: LocationComponent}
    ])
  ],
  exports: [RouterModule]
})
export class LocationRoutingModule { }
