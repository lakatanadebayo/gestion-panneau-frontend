import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {ClientPortalComponent} from "../../component/client-portal/client-portal.component";


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      { path: 'location', loadChildren: () => import('./location/location-routing.module').then(m => m.LocationRoutingModule)},
      {path: '', component: ClientPortalComponent}
    ])
  ],
  exports: [RouterModule]
})
export class ClientPortalRoutingModule { }
