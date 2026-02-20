import { Component } from '@angular/core';
import { Receta } from '../../interfaces/receta';
import { FormsModule } from '@angular/forms';
import { RecetaFilterPipe } from '../../pipes/receta-filter-pipe';

@Component({
  selector: 'app-recetas-show',
  imports: [FormsModule, RecetaFilterPipe],
  templateUrl: './recetas-show.html',
  styleUrl: './recetas-show.css',
})
export class RecetasShow {

  filterSearch = ''

  recetas: Receta[] = [{
    id: '1',
    nombre: 'Espaguetis a la carbonara',
    imagen: 'assets/espaguetis.jpg',
    descripcion: 'Espaguetis con una pasta cremosa con huevo, queso y panceta',
    ingredientes: ['Espaguetis', 'Panceta/Bacon', 'Yemas de huevo', 'Queso parmesano'],
    pasos: [
      'Cocer los espaguetis en agua con sal según las instrucciones del paquete.',
      'Freír la panceta en una sartén hasta que esté crujiente.',
      'Batir las yemas de huevo con el queso parmesano rallado.',
      'Escurrir la pasta y mezclarla con la panceta caliente.',
      'Retirar del fuego y añadir la mezcla de huevo y queso, removiendo rápido para que no se cuaje.',
      'Servir inmediatamente con pimienta negra al gusto.'
    ],
    tipo: 'comida',
  },
  {
    id: '2',
    nombre: 'Tarta de manzana',
    imagen: 'assets/tarta-manzana.jpeg',
    descripcion: 'Tarta de manzana casera con canela y azúcar.',
    ingredientes: ['Masa quebrada', 'Manzanas', 'Azúcar', 'Canela', 'Mantequilla'],
    pasos: [
      'Precalentar el horno a 180°C.',
      'Extender la masa en un molde para tartas.',
      'Pelar y cortar las manzanas en láminas finas.',
      'Colocar las manzanas sobre la masa y espolvorear con azúcar y canela.',
      'Añadir pequeños trozos de mantequilla por encima.',
      'Hornear durante 35-40 minutos hasta que la masa esté dorada.',
      'Dejar enfriar antes de servir.'
    ],
    tipo: 'postre',
  },
  {
    id: '3',
    nombre: 'Smoothie de frutas',
    imagen: 'assets/smoothie-frutas.jpeg',
    descripcion: 'Bebida refrescante y saludable a base de frutas naturales.',
    ingredientes: ['Plátano', 'Fresas', 'Mango', 'Leche o yogur', 'Miel'],
    pasos: [
      'Lavar y pelar las frutas según corresponda.',
      'Cortar las frutas en trozos pequeños.',
      'Añadir las frutas al vaso de la licuadora junto con la leche o yogur.',
      'Licuar hasta obtener una mezcla homogénea.',
      'Añadir miel al gusto y mezclar nuevamente.',
      'Servir frío en un vaso grande.'
    ],
    tipo: 'bebida',
  },
  {
    id: '4',
    nombre: 'Ensalada César',
    imagen: 'assets/ensalada-cesar.jpeg',
    descripcion: 'Ensalada clásica con lechuga, pollo y aderezo César.',
    ingredientes: ['Lechuga romana', 'Pechuga de pollo', 'Crutones', 'Queso parmesano', 'Aderezo César'],
    pasos: [
      'Cocer la pechuga de pollo a la plancha y cortarla en tiras.',
      'Lavar y trocear la lechuga.',
      'Mezclar la lechuga con los crutones y el pollo.',
      'Añadir el aderezo César al gusto y mezclar bien.',
      'Espolvorear con queso parmesano rallado antes de servir.'
    ],
    tipo: 'comida',
  }
  ];
}