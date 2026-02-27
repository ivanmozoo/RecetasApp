import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appInicialMayuscula]',
})
export class InicialMayuscula {

  constructor(private control: NgControl) { }

  @HostListener('input', ['$event'])
  onInput(event: Event) {

    const input = event.target as HTMLInputElement;
    if (!input.value) return;

    const capitalized =
      input.value.charAt(0).toUpperCase() + input.value.slice(1);

    if (input.value !== capitalized) {
      this.control.control?.setValue(capitalized, { emitEvent: false });
    }
  }

}
