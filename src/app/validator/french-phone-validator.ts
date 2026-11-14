import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function frenchPhoneValidator(): ValidatorFn {
  // Autorise : 0XXXXXXXXX ou +33XXXXXXXXX, avec espaces/tirets éventuels
  const regex = /^(?:0|\+33)[1-9](?:[\s.-]?\d{2}){4}$/;

  return (control: AbstractControl): ValidationErrors | null => {
    const value = (control.value || '').toString().trim();
    if (!value) return null; // laisser "required" gérer le champ vide

    return regex.test(value) ? null : { frenchPhone: true };
  };
}
