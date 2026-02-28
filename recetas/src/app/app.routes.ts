import { Routes } from '@angular/router';
import { RecetasShow } from './components/recetas-show/recetas-show';
import { Landing } from './components/landing/landing';
import { CrearReceta } from './components/crear-receta/crear-receta';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    { path: '', component: Landing },
    { path: 'recetas', component: RecetasShow, canActivate: [authGuard] },
    {
        path: 'receta-detalle/:id',
        loadComponent: () =>
            import('./components/receta-detalle/receta-detalle')
                .then(m => m.RecetaDetalle),
        canActivate: [authGuard]
    },
    {
        path: 'editar-receta/:id',
        loadComponent: () =>
            import('./components/editar-receta/editar-receta')
                .then(m => m.EditarReceta),
        canActivate: [authGuard]
    },
    { path: 'crear-receta', component: CrearReceta, canActivate: [authGuard] },
    { 
        path: 'login',
        loadComponent: () =>
            import('./components/login/login').then(m => m.Login)
    },
    { 
        path: 'register',
        loadComponent: () =>
            import('./components/register/register').then(m => m.Register)
    },
    { path: '**', redirectTo: '' }
];
