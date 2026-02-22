import { Pipe, PipeTransform } from '@angular/core';
import { Receta } from '../interfaces/receta';

@Pipe({
  name: 'tipoSelect',
})
export class TipoSelectPipe implements PipeTransform {

  transform(recetas: Receta[], filterBy: string): Receta[] {
    if (filterBy) {
      return recetas.filter(receta => receta.tipo.toLowerCase() === filterBy.toLowerCase());
    }
    return recetas;
  }
}
