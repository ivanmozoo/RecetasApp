import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ingredienteFilter',
})
export class IngredienteFilterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
