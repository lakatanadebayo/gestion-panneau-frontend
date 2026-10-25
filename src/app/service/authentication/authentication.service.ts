import { Injectable } from '@angular/core';
import {DataService} from "../data/data.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private dataService: DataService, private router: Router) { }

  logout(){
    this.dataService.setAuthStatus(false)
    this.dataService.setUser(null)
    this.dataService.setIsUpdateProcess(false)
    this.router.navigate(['app'])
  }
}
