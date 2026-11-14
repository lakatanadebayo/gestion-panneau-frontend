import {AbstractControl, AsyncValidatorFn} from '@angular/forms'
import {map} from 'rxjs/operators'
import {of} from 'rxjs'
import {UserService} from "../service/user/user.service"
import {FindByUsername} from "../entity/FindByUsername";

export function uniqueUsernameValidator(userService: UserService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    const formGroup = control.parent;
    if (!formGroup) return of(null)

    const username = formGroup.get('username')?.value

    if (!username) return of(null)

    const findByUsername = new FindByUsername(username)

    return userService.findByUsername(findByUsername).pipe(
      map(exists => (exists ? { usernameExiste: 'Nom d\'utilisateur déjà utilisé' } : null))
    )
  }
}
