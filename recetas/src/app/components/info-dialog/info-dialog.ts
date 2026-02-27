import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-info-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './info-dialog.html',
  styleUrl: './info-dialog.css',
})
export class InfoDialog {
  constructor(
    private dialogRef: MatDialogRef<InfoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  cerrar() {
    this.dialogRef.close();
  }
}
