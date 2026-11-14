import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userFilter'
})
export class UserFilterPipe implements PipeTransform {
  transform(users: any[], searchTerm: string): any[] {
    if (!searchTerm || searchTerm.trim() === '') return users;

    searchTerm = searchTerm.toLowerCase();

    return users.filter(u =>
      (u.nom?.toLowerCase().includes(searchTerm) ||
        u.prenom?.toLowerCase().includes(searchTerm) ||
        u.email?.toLowerCase().includes(searchTerm) ||
        u.username?.toLowerCase().includes(searchTerm))
    );
  }
}
