import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from "./app.component";
import {HomeComponent} from "./component/home/home.component";
import {AuthenticationComponent} from "./component/authentication/authentication.component";

const routes: Routes = [
  {
    path: 'app',
    component: AppComponent,
    children: [
      {path: 'home', component: HomeComponent},
      {path: 'authentication', component: AuthenticationComponent},
      {path: '', redirectTo: 'home', pathMatch: 'full'}
    ]
  },
  {path: '', redirectTo: 'app/home', pathMatch: 'full'},
  {path: '**', redirectTo: 'app/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
