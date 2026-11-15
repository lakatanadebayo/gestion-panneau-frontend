import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {ClientPortalComponent} from "../../component/client-portal/client-portal.component";


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      { path: 'location', loadChildren: () => import('./location/location.module').then(m => m.LocationModule)},
      {path: '', component: ClientPortalComponent}
    ])
  ],
  exports: [RouterModule]
})
export class ClientPortalRoutingModule { }
