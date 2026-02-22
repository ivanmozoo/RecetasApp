import { Component } from '@angular/core';
import { Receta } from '../../interfaces/receta';
import { FormsModule } from '@angular/forms';
import { RecetaFilterPipe } from '../../pipes/receta-filter-pipe';
import { IngredienteFilterPipe } from '../../pipes/ingrediente-filter-pipe';

@Component({
  selector: 'app-recetas-show',
  imports: [FormsModule, RecetaFilterPipe, IngredienteFilterPipe],
  templateUrl: './recetas-show.html',
  styleUrl: './recetas-show.css',
})
export class RecetasShow {

  filterSearch = ''
  filterIngrediente = ''

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
  },
  {
    id: '5',
    nombre: 'Guacamole clásico',
    imagen: 'assets/Guacamole.jpg',
    descripcion: 'Dip mexicano de aguacate con limón y cilantro.',
    ingredientes: ['Aguacates', 'Cebolla', 'Tomate', 'Cilantro', 'Limón', 'Sal'],
    pasos: [
      'Pelar y triturar los aguacates en un bol.',
      'Picar finamente la cebolla, el tomate y el cilantro.',
      'Añadir al aguacate triturado y mezclar bien.',
      'Exprimir el limón y sazonar con sal al gusto.',
      'Servir inmediatamente acompañado de totopos o pan tostado.'
    ],
    tipo: 'comida',
  },
  {
    id: '6',
    nombre: 'Brownies de chocolate',
    imagen: 'assets/Brownies.png',
    descripcion: 'Brownies húmedos y chocolatosos con nueces.',
    ingredientes: ['Chocolate negro', 'Mantequilla', 'Azúcar', 'Huevos', 'Harina', 'Nueces'],
    pasos: [
      'Precalentar el horno a 180°C.',
      'Derretir el chocolate con la mantequilla al baño maría.',
      'Batir los huevos con el azúcar hasta que estén esponjosos.',
      'Añadir la mezcla de chocolate y mantequilla, luego la harina y nueces.',
      'Verter en un molde engrasado y hornear 25-30 minutos.',
      'Dejar enfriar y cortar en porciones.'
    ],
    tipo: 'postre',
  },
  {
    id: '7',
    nombre: 'Limonada casera',
    imagen: 'assets/Limonada.jpg',
    descripcion: 'Bebida refrescante de limón natural con azúcar.',
    ingredientes: ['Limones', 'Agua', 'Azúcar', 'Hielo', 'Hojas de menta'],
    pasos: [
      'Exprimir los limones y colar el jugo.',
      'Disolver el azúcar en un poco de agua tibia.',
      'Mezclar el jugo de limón con el agua azucarada y el resto del agua fría.',
      'Añadir hielo y decorar con menta si se desea.',
      'Servir inmediatamente.'
    ],
    tipo: 'bebida',
  },
  {
    id: '8',
    nombre: 'Pasta al pesto',
    imagen: 'assets/Pasta-pesto.jpg',
    descripcion: 'Pasta con salsa pesto de albahaca y piñones.',
    ingredientes: ['Pasta', 'Albahaca fresca', 'Piñones', 'Queso parmesano', 'Ajo', 'Aceite de oliva'],
    pasos: [
      'Cocer la pasta según las instrucciones del paquete.',
      'Preparar el pesto triturando albahaca, piñones, ajo y queso con aceite de oliva.',
      'Escurrir la pasta y mezclar con la salsa pesto.',
      'Servir con un poco de queso parmesano rallado por encima.'
    ],
    tipo: 'comida',
  },
  {
    id: '9',
    nombre: 'Té helado de frutas',
    imagen: 'assets/Te-helado-frutas.jpg',
    descripcion: 'Té frío infusionado con frutas naturales.',
    ingredientes: ['Bolsitas de té negro', 'Agua', 'Fresas', 'Rodajas de naranja', 'Miel', 'Hielo'],
    pasos: [
      'Preparar el té negro y dejar enfriar.',
      'Añadir las frutas cortadas en rodajas o trozos.',
      'Endulzar con miel al gusto.',
      'Servir con hielo en vasos altos.'
    ],
    tipo: 'bebida',
  },
  {
    id: '10',
    nombre: 'Pizza margarita',
    imagen: 'assets/Pizza-margarita.jpg',
    descripcion: 'Pizza clásica con tomate, mozzarella y albahaca.',
    ingredientes: ['Masa de pizza', 'Tomate triturado', 'Mozzarella', 'Albahaca fresca', 'Aceite de oliva'],
    pasos: [
      'Precalentar el horno a 220°C.',
      'Extender la masa en una bandeja para horno.',
      'Cubrir con tomate triturado y mozzarella en trozos.',
      'Hornear 12-15 minutos hasta que esté dorada.',
      'Añadir hojas de albahaca fresca y un chorrito de aceite antes de servir.'
    ],
    tipo: 'comida',
  },
  {
    id: '11',
    nombre: 'Crema catalana',
    imagen: 'assets/Crema-catalana.jpg',
    descripcion: 'Postre típico con textura cremosa y caramelo crujiente.',
    ingredientes: ['Leche', 'Yemas de huevo', 'Azúcar', 'Maicena', 'Canela', 'Cáscara de limón'],
    pasos: [
      'Calentar la leche con canela y cáscara de limón.',
      'Batir las yemas con azúcar y maicena.',
      'Verter la leche caliente sobre la mezcla y cocinar a fuego medio hasta espesar.',
      'Dejar enfriar y caramelizar la superficie con azúcar.',
      'Servir frío.'
    ],
    tipo: 'postre',
  },
  {
    id: '12',
    nombre: 'Sopa de verduras',
    imagen: 'assets/sopa-de-verduras.jpg',
    descripcion: 'Sopa ligera con verduras de temporada.',
    ingredientes: ['Zanahoria', 'Calabacín', 'Patata', 'Cebolla', 'Apio', 'Caldo de verduras', 'Sal', 'Pimienta'],
    pasos: [
      'Picar todas las verduras en trozos uniformes.',
      'Saltear la cebolla y el apio en una olla con un poco de aceite.',
      'Añadir el resto de verduras y cubrir con caldo.',
      'Cocer a fuego medio hasta que las verduras estén tiernas.',
      'Triturar si se desea una textura cremosa y sazonar al gusto.'
    ],
    tipo: 'comida',
  },
  {
    id: '13',
    nombre: 'Batido de chocolate',
    imagen: 'assets/batido-de-chocolate.jpg',
    descripcion: 'Bebida cremosa de chocolate con leche.',
    ingredientes: ['Leche', 'Cacao en polvo', 'Azúcar', 'Hielo', 'Crema batida'],
    pasos: [
      'Mezclar la leche con el cacao y el azúcar hasta disolver.',
      'Añadir hielo y licuar hasta obtener una mezcla homogénea.',
      'Servir en vaso alto y opcionalmente decorar con crema batida.'
    ],
    tipo: 'bebida',
  },
  {
    id: '14',
    nombre: 'Cheesecake clásico',
    imagen: 'assets/Cheesecake.jpg',
    descripcion: 'Postre cremoso con base de galleta y cobertura ligera.',
    ingredientes: ['Galletas', 'Mantequilla', 'Queso crema', 'Azúcar', 'Huevos', 'Esencia de vainilla'],
    pasos: [
      'Triturar las galletas y mezclarlas con mantequilla derretida.',
      'Presionar la mezcla en el fondo de un molde y refrigerar.',
      'Batir el queso crema con azúcar, huevos y esencia de vainilla.',
      'Verter sobre la base de galleta y hornear a 160°C por 50 minutos.',
      'Dejar enfriar y refrigerar antes de servir.'
    ],
    tipo: 'postre',
  }
  ];
}