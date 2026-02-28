import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormArray, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { TitleCasePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { Recetas } from '../../services/recetas';
import { Receta } from '../../interfaces/receta';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { InfoDialog } from '../info-dialog/info-dialog';
import { InicialMayuscula } from '../../directives/inicial-mayuscula';
import { SnackBar } from '../snack-bar/snack-bar';
import { noEspacios } from '../../directives/no-espacios';

@Component({
  selector: 'app-editar-receta',
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink,
    MatSelectModule,
    MatIconModule,
    TitleCasePipe,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MatDialogModule,
    InicialMayuscula
  ],
  templateUrl: './editar-receta.html',
  styleUrl: './editar-receta.css',
})
export class EditarReceta {
  private _formBuilder = inject(FormBuilder);

  nombreFormGroup = this._formBuilder.group({
    nombreCtrl: ['', [Validators.required, noEspacios]],
  });

  descripcionFormGroup = this._formBuilder.group({
    descripcionCtrl: ['', [Validators.required, noEspacios]],
  });

  imagenFormGroup = this._formBuilder.group({
    imagenCtrl: this._formBuilder.control<File | null>(null),
  });

  tipoFormGroup = this._formBuilder.group({
    tipoCtrl: ['', Validators.required],
  });

  pasosFormGroup = this._formBuilder.group({
    pasos: this._formBuilder.array([])
  });

  ingredientesFormGroup = this._formBuilder.group({
    ingredientes: this._formBuilder.array([])
  });

  get ingredientesArray(): FormArray {
    return this.ingredientesFormGroup.get('ingredientes') as FormArray;
  }

  private crearIngrediente(): FormGroup {
    return this._formBuilder.group({
      nombre: ['', [Validators.required, noEspacios]],
      cantidad: ['', [Validators.required, noEspacios]],
      medida: ['']
    });
  }

  agregarIngrediente() {
    this.ingredientesArray.push(this.crearIngrediente());
  }

  eliminarIngrediente(index: number) {
    this.ingredientesArray.removeAt(index);
  }

  get pasosArray(): FormArray {
    return this.pasosFormGroup.get('pasos') as FormArray;
  }

  agregarPaso() {
    this.pasosArray.push(this._formBuilder.control('', [Validators.required, noEspacios]));
  }

  eliminarPaso(index: number) {
    this.pasosArray.removeAt(index);
  }

  foto: { image?: string } = {};

  changeImage(inputFile: HTMLInputElement) {
    const file = inputFile.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        this.foto.image = reader.result as string;
        this._cdr.detectChanges();
      };
      reader.readAsDataURL(file);

      this.imagenFormGroup.get('imagenCtrl')?.setValue(file);
    } else {
      this.dialog.open(InfoDialog, {
        width: '350px',
        data: {
          titulo: 'Error',
          mensaje: 'Solo se admiten imagenes.',
          textoBoton: 'Aceptar'
        }
      });
      inputFile.value = '';
    }
  }

  get pasosConValor(): boolean {
    return this.pasosArray.controls.some(p => !!p?.value);
  }

  get ingredientesConValor(): boolean {
    return this.ingredientesArray.controls.some(i =>
      !!i?.get('nombre')?.value || !!i?.get('cantidad')?.value || !!i?.get('medida')?.value
    );
  }

  confirmarReset(stepper: any, fileInput?: HTMLInputElement) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '400px',
      data: {
        titulo: 'Resetear formulario',
        mensaje: 'Se borrará el contenido de todos los campos. ¿Deseas continuar?',
        textoCancelar: 'Cancelar',
        textoConfirmar: 'Resetear'
      }
    });

    dialogRef.afterClosed().subscribe(confirmado => {
      if (!confirmado) return;
      this.resetFormulario(stepper, fileInput);
    });
  }

  resetFormulario(stepper: any, fileInput?: HTMLInputElement) {
    stepper.reset();
    this.nombreFormGroup.reset();
    this.descripcionFormGroup.reset();
    this.imagenFormGroup.reset();
    this.tipoFormGroup.reset();
    this.ingredientesArray.clear();
    this.pasosArray.clear();
    this.agregarIngrediente();
    this.agregarPaso()
    this.foto = {};
    if (fileInput) {
      fileInput.value = '';
    }
  }

  private cargarDatosEnFormulario(receta: Receta) {

    this.nombreFormGroup.patchValue({
      nombreCtrl: receta.nombre
    });

    this.descripcionFormGroup.patchValue({
      descripcionCtrl: receta.descripcion
    });

    this.tipoFormGroup.patchValue({
      tipoCtrl: receta.tipo
    });

    this.foto.image = receta.imagen;

    this.ingredientesArray.clear();
    receta.ingredientes.forEach(i => {
      this.ingredientesArray.push(
        this._formBuilder.group({
          nombre: [i.nombre, [Validators.required, noEspacios]],
          cantidad: [i.cantidad, [Validators.required, noEspacios]],
          medida: [i.medida]
        })
      );
    });

    this.pasosArray.clear();
    receta.pasos.forEach(p => {
      this.pasosArray.push(
        this._formBuilder.control(p, [Validators.required, noEspacios])
      );
    });
  }

  editarReceta(stepper: any, fileInput?: HTMLInputElement) {
    const recetaEditada: Receta = {
      id: this.recetaId,
      nombre: this.nombreFormGroup.get('nombreCtrl')!.value as string,
      imagen: this.foto.image,
      descripcion: this.descripcionFormGroup.get('descripcionCtrl')!.value as string,
      ingredientes: this.ingredientesArray.value,
      pasos: this.pasosArray.value as string[],
      tipo: this.tipoFormGroup.get('tipoCtrl')!.value as Receta['tipo']
    };

    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '400px',
      data: {
        titulo: 'Editar receta',
        mensaje: `¿Estás seguro de que quieres editar "${recetaEditada.nombre}"?`,
        textoCancelar: 'Cancelar',
        textoConfirmar: 'Editar'
      }
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado) {
        this.recetasService.updateReceta(this.recetaId, recetaEditada).subscribe({
          next: () => {
            this.resetFormulario(stepper, fileInput);
            this.router.navigate(['/recetas']);
            this.snackBar.openSnackBar('Receta editada exitosamente');
          },
          error: (err) => {
            console.error(err);
            this.dialog.open(InfoDialog, {
              width: '350px',
              data: {
                titulo: 'Error',
                mensaje: 'Ha ocurrido un error al editar la receta.',
                textoBoton: 'Aceptar'
              }
            });
          }
        });
      }
    })
  }

  apiRunning?: boolean;
  recetaId!: string;

  ngOnInit() {
    this.recetaId = this.route.snapshot.paramMap.get('id')!;
    this.recetasService.getRecetaById(this.recetaId).subscribe({
      next: receta => {
        this.cargarDatosEnFormulario(receta);
        this.apiRunning = true;
        this._cdr.detectChanges();
      },
      error: err => {
        console.error(err);
        this.apiRunning = false;
        this._cdr.detectChanges();
      }
    });
  }

  constructor(
    private recetasService: Recetas,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: SnackBar,
    private route: ActivatedRoute,
    private _cdr: ChangeDetectorRef
  ) {
    this.agregarIngrediente();
    this.agregarPaso();
  }
}
