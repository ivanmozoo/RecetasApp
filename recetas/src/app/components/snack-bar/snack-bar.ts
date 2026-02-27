import { Component, inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-snack-bar',
  imports: [],
  templateUrl: './snack-bar.html',
  styleUrl: './snack-bar.css',
})
export class SnackBar {
  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, duration = 4000) {
    this._snackBar.open(message, 'Cerrar', {duration});
  }
}
