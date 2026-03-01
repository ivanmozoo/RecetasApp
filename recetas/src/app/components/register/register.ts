import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialog } from '../info-dialog/info-dialog';
import { noEspacios } from '../../directives/no-espacios';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  form;
  apiRunning = false;

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private router: Router,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required, noEspacios]],
      password: ['', [Validators.required, noEspacios, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, noEspacios]]
    });
  }

  ngOnInit() {
    this.auth.userExist('test').subscribe({
      next: () => {
        this.apiRunning = true;
        this.cd.detectChanges();
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

  onSubmit() {
    if (!this.apiRunning) return;

    if (this.form.invalid) {
      if (this.form.get('password')?.hasError('minlength')) {
        this.dialog.open(InfoDialog, {
          width: '350px',
          data: {
            titulo: 'Error',
            mensaje: 'No puedes crear una contraseña de menos de 6 caracteres',
            textoBoton: 'Aceptar'
          }
        });
        return;
      }

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

    const username: string = this.form.get('username')!.value!;
    const password: string = this.form.get('password')!.value!;
    const confirmPassword: string = this.form.get('confirmPassword')!.value!;

    if (password !== confirmPassword) {
      this.dialog.open(InfoDialog, {
        width: '350px',
        data: {
          titulo: 'Error',
          mensaje: 'Las contraseñas no coinciden',
          textoBoton: 'Aceptar'
        }
      });
      return;
    }

    this.auth.userExist(username).subscribe(users => {
      if (users.length > 0) {
        this.dialog.open(InfoDialog, {
          width: '350px',
          data: {
            titulo: 'Error',
            mensaje: 'El nombre de usuario ya existe',
            textoBoton: 'Aceptar'
          }
        });
        return;
      }

      this.auth.register({ username, password })
        .subscribe(() => {
          const dialogRef = this.dialog.open(InfoDialog, {
            width: '350px',
            data: {
              titulo: 'Éxito',
              mensaje: 'Cuenta creada correctamente',
              textoBoton: 'Aceptar'
            }
          });
          dialogRef.afterClosed().subscribe(() => {
            this.router.navigate(['/login']);
          });
        });
    });
  }
}
