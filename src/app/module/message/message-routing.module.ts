import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      { path: 'notification', loadChildren: () => import('./notification/notification.module').then(m => m.NotificationModule) },
      { path: 'notfound', loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule) },
      { path: '**', redirectTo: '/app/message/notfound'}
    ])
  ],
  exports: [RouterModule]
})
export class MessageRoutingModule { }
