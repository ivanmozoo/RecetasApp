import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recetas-navbar',
  imports: [RouterLink],
  templateUrl: './recetas-navbar.html',
  styleUrl: './recetas-navbar.css',
})
export class RecetasNavbar {
  title = 'RECETAS';
  btnLogin = 'LOGIN';
  btnRegistro = 'REGISTRO';

  currentUser: { username: string } | null = null;
  private sub!: Subscription;

  constructor(
    public auth: Auth,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.sub = this.auth.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  logout() {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '400px',
      data: {
        titulo: 'Cerrar sesión',
        mensaje: `¿Estás seguro de que quieres cerrar sesión, "${this.currentUser?.username}"?`,
        textoCancelar: 'Cancelar',
        textoConfirmar: 'Aceptar'
      }
    });
    dialogRef.afterClosed().subscribe(confirmado => {
      if (confirmado) {
        this.auth.logout();
        this.currentUser = null;
        this.router.navigate(['/']);
      }
    });
  }
}
