import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Receta } from '../../interfaces/receta';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Recetas } from '../../services/recetas';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-receta-detalle',
  imports: [RouterLink, MatIconModule, MatTooltipModule, MatButtonModule, MatDialogModule],
  templateUrl: './receta-detalle.html',
  styleUrl: './receta-detalle.css',
})
export class RecetaDetalle implements OnInit {
  receta?: Receta;
  apiRunning?: boolean;

  constructor(
    private route: ActivatedRoute,
    private recetasService: Recetas,
    private cd: ChangeDetectorRef,
    private router: Router,
    private dialog: MatDialog
  ) { }

  eliminarReceta() {
    if (!this.receta) return;
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '400px',
      data: {
        titulo: 'Eliminar receta',
        mensaje: `¿Estás seguro de que quieres eliminar "${this.receta.nombre}"?`,
        textoCancelar: 'Cancelar',
        textoConfirmar: 'Eliminar'
      }
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado) {
        this.recetasService.deleteReceta(this.receta!.id).subscribe({
          next: () => {
            this.router.navigate(['/recetas']);
          },
          error: (err) => {
            console.error(err);
            alert('Error al eliminar la receta');
          }
        });
      }
    });
  }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) {
      this.apiRunning = false;
      return;
    }

    this.recetasService.getRecetaById(idParam).subscribe({
      next: receta => {
        this.receta = receta;
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
