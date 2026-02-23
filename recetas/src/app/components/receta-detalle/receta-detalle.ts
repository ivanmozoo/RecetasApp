import { Component } from '@angular/core';
import { Receta } from '../../interfaces/receta';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Recetas } from '../../services/recetas';

@Component({
  selector: 'app-receta-detalle',
  imports: [RouterLink],
  templateUrl: './receta-detalle.html',
  styleUrl: './receta-detalle.css',
})
export class RecetaDetalle {
  receta!: Receta;

  constructor(
  private route: ActivatedRoute,
  private recetasService: Recetas
) {}

ngOnInit() {
  const id = this.route.snapshot.paramMap.get('id')!;
  this.receta = this.recetasService.getRecetaById(id)!;
}
}
