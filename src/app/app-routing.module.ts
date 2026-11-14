import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from "./app.component";
import {HomeComponent} from "./component/home/home.component";
import {AuthenticationComponent} from "./component/authentication/authentication.component";
import {InscriptionComponent} from "./component/inscription/inscription.component";
import {AdminPortalComponent} from "./component/admin-portal/admin-portal.component";
import {ClientPortalComponent} from "./component/client-portal/client-portal.component";
import {OwnerPortalComponent} from "./component/owner-portal/owner-portal.component";
import {MessageComponent} from "./component/message/message.component";

const routes: Routes = [
  {
    path: 'app',
    component: AppComponent,
    children: [

      {path: 'home', component: HomeComponent},

      {path: 'admin', component: AdminPortalComponent,
        children: [
          { path: '', loadChildren: () => import('./module/admin-portal/admin-portal.module').then(m => m.AdminPortalModule) }
        ]
      },

      {path: 'client', component: ClientPortalComponent,
        children: [
          { path: '', loadChildren: () => import('./module/client-portal/client-portal.module').then(m => m.ClientPortalModule) }
        ]
      },

      {path: 'owner', component: OwnerPortalComponent,
        children: [
          { path: '', loadChildren: () => import('./module/owner-portal/owner-portal.module').then(m => m.OwnerPortalModule) }
        ]
      },

      { path: 'message', component: MessageComponent,
        children: [
          { path: '', loadChildren: () => import('./module/message/message.module').then(m => m.MessageModule) }
        ]
      },

      {path: 'authentication', component: AuthenticationComponent},
      {path: 'inscription', component: InscriptionComponent},
      {path: '', redirectTo: 'home', pathMatch: 'full'}
    ]
  },
  {path: '', redirectTo: 'app/home', pathMatch: 'full'},
  { path: '**', redirectTo: '/app/message/notfound' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
