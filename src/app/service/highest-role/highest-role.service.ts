import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HighestRoleService {

  static readonly ROLE_PRIORITY = ['USER', 'EMPLOYE', 'ADMIN', 'SUPER-ADMIN']

  constructor() { }

  getHighestRole(userRoles: string[]): string | null {
    return userRoles
      .sort((a, b) => HighestRoleService.ROLE_PRIORITY.indexOf(b) - HighestRoleService.ROLE_PRIORITY.indexOf(a))
      .find(role => HighestRoleService.ROLE_PRIORITY.includes(role)) || null
  }
}
