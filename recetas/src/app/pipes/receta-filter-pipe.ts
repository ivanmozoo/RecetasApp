import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'recetaFilter',
})
export class RecetaFilterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
