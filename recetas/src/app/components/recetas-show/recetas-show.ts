import { Component } from '@angular/core';
import { Receta } from '../../interfaces/receta';

@Component({
  selector: 'app-recetas-show',
  imports: [],
  templateUrl: './recetas-show.html',
  styleUrl: './recetas-show.css',
})
export class RecetasShow {
  Recetas: Receta[] = [{
    id: '1',
    nombre: 'Espaguetis a la carbonara',
    imagen: 'assets/espaguetis.jpg',
    descripcion: 'Espaguetis con una pasta cremosa con huevo, queso y panceta',
    ingredientes: ['Espaguetis', 'Panceta/Bacon', 'Yema de huevo', 'Queso parmesano'],
    pasos: [
        'Cocer los espaguetis en agua con sal según las instrucciones del paquete.',
        'Freír la panceta en una sartén hasta que esté crujiente.',
        'Batir las yemas de huevo con el queso parmesano rallado.',
        'Escurrir la pasta y mezclarla con la panceta caliente.',
        'Retirar del fuego y añadir la mezcla de huevo y queso, removiendo rápido para que no se cuaje.',
        'Servir inmediatamente con pimienta negra al gusto.'
      ],
    tipo: 'comida',
  }]
}
