import { Component } from '@angular/core';
import { Receta } from '../../interfaces/receta';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-receta-detalle',
  imports: [RouterLink],
  templateUrl: './receta-detalle.html',
  styleUrl: './receta-detalle.css',
})
export class RecetaDetalle {
  receta!: Receta;
}
