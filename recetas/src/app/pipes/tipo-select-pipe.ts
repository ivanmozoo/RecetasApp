import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipoSelect',
})
export class TipoSelectPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
