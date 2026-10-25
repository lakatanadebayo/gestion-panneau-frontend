import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {HomeComponent} from "../../component/home/home.component";


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      // { path: 'find-ouvrier', loadChildren: () => import('./find-ouvrier/find-ouvrier-routing.module').then(m => m.FindOuvrierRoutingModule)},
      {path: '', component: HomeComponent}
    ])
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
