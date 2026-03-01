import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { InfoDialog } from '../info-dialog/info-dialog';
import { MatDialog } from '@angular/material/dialog';
import { noEspacios } from '../../directives/no-espacios';

@Component({
  selector: 'app-login',
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  mostrarPassword = false;
  form;
  apiRunning = false;

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private router: Router,
    private dialog: MatDialog,
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required, noEspacios]],
      password: ['', [Validators.required, noEspacios]]
    });
  }

  ngOnInit() {
    this.auth.userExist('test').subscribe({
      next: () => {
        this.apiRunning = true;
      },
      error: () => {
        const dialogRef = this.dialog.open(InfoDialog, {
          width: '350px',
          data: {
            titulo: 'Servicio no disponible',
            mensaje: 'El servicio no está disponible en este momento.',
            textoBoton: 'Aceptar'
          }
        });

        dialogRef.afterClosed().subscribe(() => {
          this.router.navigate(['/']);
        });
      }
    });
  }

  togglePassword() {
    this.mostrarPassword = !this.mostrarPassword;
  }

  onSubmit() {
    if (!this.apiRunning) return;

    if (this.form.invalid) {
      this.dialog.open(InfoDialog, {
        width: '350px',
        data: {
          titulo: 'Error',
          mensaje: 'No puede haber campos vacíos ni con espacios',
          textoBoton: 'Aceptar'
        }
      });
      return;
    }

    const { username, password } = this.form.value;

    this.auth.login(username!, password!)
      .subscribe({
        next: (users) => {
          if (users.length > 0) {
            this.router.navigate(['/recetas']);
          } else {
            this.dialog.open(InfoDialog, {
              width: '350px',
              data: {
                titulo: 'Error',
                mensaje: 'Usuario o contraseña incorrectos',
                textoBoton: 'Aceptar'
              }
            });
          }
        },
        error: () => {
          this.dialog.open(InfoDialog, {
            width: '350px',
            data: {
              titulo: 'Error',
              mensaje: 'No se pudo conectar con el servidor.',
              textoBoton: 'Aceptar'
            }
          });
        }
      });
  }
}
