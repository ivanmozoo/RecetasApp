import { Component } from '@angular/core';
import { Receta } from '../../interfaces/receta';

@Component({
  selector: 'app-receta-detalle',
  imports: [],
  templateUrl: './receta-detalle.html',
  styleUrl: './receta-detalle.css',
})
export class RecetaDetalle {
  receta!: Receta;
}
