import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {NotificationComponent} from "../../../component/notification/notification.component";



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {path: '', component: NotificationComponent}
    ])
  ],
  exports: [RouterModule]
})
export class NotificationRoutingModule { }
