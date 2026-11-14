import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {AdminPortalComponent} from "../../component/admin-portal/admin-portal.component";
import {authGuard} from "../../service/auth-guard/auth-guard.service";


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule), canActivate: [authGuard]},
      {path: '', component: AdminPortalComponent}
    ])
  ],
  exports: [RouterModule]
})
export class AdminPortalRoutingModule { }
