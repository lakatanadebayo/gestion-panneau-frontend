import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  home() {
    this.router.navigate(['app/home'])
  }

  getUser() {
    this.router.navigate(['app/admin/user'])
  }

  inscription() {
    this.router.navigate(['app/inscription'])
  }

  authentication() {
    this.router.navigate(['app/authentication'])
  }

  getPanneaux() {
    this.router.navigate(['app/owner/panneau'])
  }

  getIdPanneauFromRequestParam() {
    this.activatedRoute.snapshot.params['idPanneau']
  }
}
