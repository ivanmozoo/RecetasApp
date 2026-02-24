import { Pipe, PipeTransform } from '@angular/core';
import { Receta } from '../interfaces/receta';
import { Ingrediente } from '../interfaces/ingrediente';

@Pipe({
  name: 'ingredienteFilter',
})
export class IngredienteFilterPipe implements PipeTransform {

  transform(recetas: Receta[], filterBy: string): Receta[] {
    if (filterBy) {
      return recetas.filter((receta: Receta) => {
        return receta.ingredientes.some((ingrediente: Ingrediente) =>
          this.includesText(ingrediente.nombre, filterBy)
        )
      })
    }
    return recetas
  }

  includesText(originalText: string, text: string): boolean {
    const lowercaseOriginal = originalText.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim()
    const lowercaseText = text.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim()
    return lowercaseOriginal.includes(lowercaseText)
  }
}
