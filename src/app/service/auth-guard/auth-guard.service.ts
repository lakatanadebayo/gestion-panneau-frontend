import {CanActivateFn} from '@angular/router';
import {inject} from "@angular/core";
import {NavigationService} from "../navigation/navigation.service";
import {DataService} from "../data/data.service";

export const authGuard: CanActivateFn = (route, state) => {

  const navigationService = inject(NavigationService)
  const dataService = inject(DataService)

  let localAuthStatus: boolean =  false

  dataService.authStatus$.subscribe(authStatus => {
    localAuthStatus = authStatus
  } )

  if (localAuthStatus) {
    return true;
  } else {
    navigationService.authentication()
    return false
  }

};
