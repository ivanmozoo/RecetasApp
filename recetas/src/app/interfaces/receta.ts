export interface Receta {
    id: string;
    nombre: string;
    imagen: string;
    descripcion: string;
    ingredientes: string[];
    pasos: string[];
    tipo: 'desayuno' | 'comida' 
        | 'cena'     | 'postre' 
        | 'merienda' | 'bebida' 
        | 'almuerzo';

}
