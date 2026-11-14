import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HasRoleService {

  constructor() { }

  hasRole(requiredRole: string, userRole: string | null): boolean {
    return userRole === requiredRole
  }

  hasAnyRole(roles: string[], userRole: string | null): boolean {
    if (userRole === null) {
      return false
    } else {
      return roles.includes(userRole)
    }
  }

}
