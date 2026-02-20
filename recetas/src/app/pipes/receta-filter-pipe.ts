import { Pipe, PipeTransform } from '@angular/core';
import { Receta } from '../interfaces/receta';

@Pipe({
  name: 'recetaFilter',
})
export class RecetaFilterPipe implements PipeTransform {

  transform(recetas: Receta[], filterBy: string): Receta[] {
    if (filterBy) {
      return recetas.filter((receta: Receta) => {
        return this.includesText(receta.nombre, filterBy)
      })
    }
    return recetas
  }

  includesText(originalText: string, text: string): boolean {
    const lowercaseOriginal = originalText.toLocaleLowerCase()
    const lowercaseText = text.toLocaleLowerCase()
    return lowercaseOriginal.includes(lowercaseText)
  }

}
