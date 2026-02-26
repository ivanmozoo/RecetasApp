import { Ingrediente } from "./ingrediente";

export interface Receta {
    id: string;
    nombre: string;
    imagen?: string;
    descripcion: string;
    ingredientes: Ingrediente[];
    pasos: string[];
    tipo: 'desayuno' | 'comida'
    | 'cena' | 'postre'
    | 'merienda' | 'bebida'
    | 'almuerzo';

}
