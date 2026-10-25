import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from "./app.component";
import {HomeComponent} from "./component/home/home.component";

const routes: Routes = [
  { path: 'app', component: AppComponent,
    children: [
      { path: 'home', component: HomeComponent,
        children: [
          { path: '', loadChildren: () => import('./module/home/home-routing.module').then(m => m.HomeRoutingModule) }
        ]
      }
    ]
  },
  { path: '', redirectTo: 'home', pathMatch:"full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
