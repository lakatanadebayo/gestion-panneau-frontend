import { AbstractControl, ValidationErrors } from '@angular/forms';

export function isoDateFormatValidator(control: AbstractControl): ValidationErrors | null {
  const value: string = control.value;

  if (!value) return null;

  const regex = /^(\d{4})-(\d{2})-(\d{2})$/;
  const match = value.match(regex);

  if (!match) {
    return { invalidDateFormat: 'Format attendu : aaaa-mm-jj' };
  }

  const year = parseInt(match[1], 10);
  const month = parseInt(match[2], 10) - 1;
  const day = parseInt(match[3], 10);

  const date = new Date(year, month, day);
  const isValid =
    date.getFullYear() === year &&
    date.getMonth() === month &&
    date.getDate() === day;

  return isValid ? null : { invalidDate: 'Date invalide' };
}
