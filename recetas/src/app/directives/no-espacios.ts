import { AbstractControl, ValidationErrors } from '@angular/forms';

export function noEspacios(control: AbstractControl): ValidationErrors | null {
    const valor = control.value;
    if (typeof valor === 'string' && valor.trim() === '') {
        return { soloEspacios: true };
    }
    return null;
}