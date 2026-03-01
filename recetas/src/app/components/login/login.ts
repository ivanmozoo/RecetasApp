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

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required, noEspacios]],
      password: ['', [Validators.required, noEspacios]]
    });
  }

  togglePassword() {
    this.mostrarPassword = !this.mostrarPassword;
  }

  onSubmit() {
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

    this.auth.login(username!, password!).subscribe(users => {
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
    });
  }
}
