import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {OwnerPortalComponent} from "../../component/owner-portal/owner-portal.component";


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      { path: 'panneau', loadChildren: () => import('./panneau/panneau.module').then(m => m.PanneauModule)},
      { path: 'panneau-new', loadChildren: () => import('./panneau-new/panneau-new.module').then(m => m.PanneauNewModule)},
      {path: '', component: OwnerPortalComponent}
    ])
  ],
  exports: [RouterModule]
})
export class OwnerPortalRoutingModule { }
