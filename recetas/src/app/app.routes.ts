import { Routes } from '@angular/router';
import { RecetasShow } from './components/recetas-show/recetas-show';
import { Landing } from './components/landing/landing';
import { RecetaDetalle } from './components/receta-detalle/receta-detalle';
import { CrearReceta } from './components/crear-receta/crear-receta';

export const routes: Routes = [
    { path: '', component: Landing },
    { path: 'recetas', component: RecetasShow },
    { path: 'receta-detalle', component: RecetaDetalle },
    {
        path: 'receta-detalle/:id',
        loadComponent: () =>
            import('./components/receta-detalle/receta-detalle')
                .then(m => m.RecetaDetalle)
    },
    { path: 'crear-receta', component: CrearReceta }
];
