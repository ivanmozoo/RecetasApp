import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
    private recetasService: Recetas,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) return;

    this.recetasService.getRecetaById(idParam).subscribe({
      next: receta => {
        this.receta = receta;
        queueMicrotask(() => this.cd.detectChanges());
      }
    });
  }
}
