import { ChangeDetectorRef, Component } from '@angular/core';
import { Receta } from '../../interfaces/receta';
import { FormsModule } from '@angular/forms';
import { RecetaFilterPipe } from '../../pipes/receta-filter-pipe';
import { IngredienteFilterPipe } from '../../pipes/ingrediente-filter-pipe';
import { TipoSelectPipe } from '../../pipes/tipo-select-pipe';
import { ItemReceta } from "../item-receta/item-receta";
import { RouterLink } from '@angular/router';
import { Recetas } from '../../services/recetas';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-recetas-show',
  imports: [FormsModule,
    RecetaFilterPipe,
    IngredienteFilterPipe,
    TipoSelectPipe,
    ItemReceta,
    RouterLink,
    MatButtonModule,
    MatTooltipModule],
  templateUrl: './recetas-show.html',
  styleUrl: './recetas-show.css',
})
export class RecetasShow {
  recetas: Receta[] = [];
  apiRunning?: boolean;

  filterSearch = '';
  filterIngrediente = '';
  selectTipo = '';

  constructor(
    private recetasService: Recetas,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.recetasService.getRecetas().subscribe({
      next: data => {
        this.recetas = data;
        this.apiRunning = true;
        queueMicrotask(() => this.cd.detectChanges());
      },
      error: err => {
        console.error(err);
        this.apiRunning = false;
        queueMicrotask(() => this.cd.detectChanges());
      }
    });
  }
}