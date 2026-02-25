import { Ingrediente } from "./ingrediente";

export interface Receta {
    id: number;
    nombre: string;
    imagen: string;
    descripcion: string;
    ingredientes: Ingrediente[];
    pasos: string[];
    tipo: 'desayuno' | 'comida'
    | 'cena' | 'postre'
    | 'merienda' | 'bebida'
    | 'almuerzo';

}
