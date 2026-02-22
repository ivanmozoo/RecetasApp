import { Routes } from '@angular/router';
import { RecetasShow } from './components/recetas-show/recetas-show';
import { Landing } from './components/landing/landing';
import { RecetaDetalle } from './components/receta-detalle/receta-detalle';

export const routes: Routes = [
    { path: '', component: Landing },
    { path: 'recetas', component: RecetasShow },
    { path: 'receta-detalle', component: RecetaDetalle }
];
