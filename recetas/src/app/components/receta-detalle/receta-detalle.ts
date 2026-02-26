import { Component, OnInit } from '@angular/core';
import { Receta } from '../../interfaces/receta';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Recetas } from '../../services/recetas';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-receta-detalle',
  imports: [RouterLink, MatIconModule, MatTooltipModule, MatButtonModule],
  templateUrl: './receta-detalle.html',
  styleUrl: './receta-detalle.css',
})
export class RecetaDetalle implements OnInit {
  receta?: Receta;

  constructor(
    private route: ActivatedRoute,
    private recetasService: Recetas
  ) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.recetasService.getRecetaById(id).subscribe({
      next: (receta) => {
        if (receta) {
          this.receta = receta;
        } else {
          alert('Receta no encontrada');
        }
      },
      error: () => alert('Error al cargar la receta')
    });
  }
}
