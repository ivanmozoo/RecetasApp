import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormArray, FormGroup, FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { TitleCasePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { Recetas } from '../../services/recetas';
import { Receta } from '../../interfaces/receta';
@Component({
  selector: 'app-crear-receta',
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
    MatDividerModule
  ],
  templateUrl: './crear-receta.html',
  styleUrl: './crear-receta.css',
})
export class CrearReceta {
  private _formBuilder = inject(FormBuilder);

  nombreFormGroup = this._formBuilder.group({
    nombreCtrl: ['', Validators.required],
  });

  descripcionFormGroup = this._formBuilder.group({
    descripcionCtrl: ['', Validators.required],
  });

  imagenFormGroup = this._formBuilder.group({
    imagenCtrl: this._formBuilder.control<File | null>(null, Validators.required),
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
      nombre: ['', Validators.required],
      cantidad: ['', Validators.required],
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
    this.pasosArray.push(this._formBuilder.control('', Validators.required));
  }

  eliminarPaso(index: number) {
    this.pasosArray.removeAt(index);
  }

  private _cdr = inject(ChangeDetectorRef);
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
      alert('Solo se permiten imágenes');
      inputFile.value = '';
      this.foto.image = undefined;
      this.imagenFormGroup.get('imagenCtrl')?.setValue(null);
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

  recetas: Receta[] = [];

  crearReceta(stepper: any, fileInput?: HTMLInputElement) {
    const maxIdNum = this.recetas.reduce((acc: number, r: Receta) => {
      const idNum = parseInt(r.id, 10);
      return isNaN(idNum) ? acc : Math.max(acc, idNum);
    }, 0);
    const nuevaReceta = {
      id: String(maxIdNum + 1),
      nombre: this.nombreFormGroup.get('nombreCtrl')!.value,
      imagen: '',
      descripcion: this.descripcionFormGroup.get('descripcionCtrl')!.value,
      ingredientes: this.ingredientesArray.value,
      pasos: this.pasosArray.value,
      tipo: this.tipoFormGroup.get('tipoCtrl')!.value
    };

    this.recetasService.crearReceta(nuevaReceta).subscribe({
      next: () => {
        alert('Receta creada con éxito!');
        this.resetFormulario(stepper, fileInput);
        this.router.navigate(['/recetas']);
      },
      error: (err) => {
        console.error(err);
        alert('Error al crear la receta');
      }
    });
  }

  ngOnInit() {
    this.recetasService.getRecetas().subscribe({
      next: data => this.recetas = data,
      error: err => console.error(err)
    });
  }

  constructor(
    private recetasService: Recetas,
    private router: Router
  ) {
    this.agregarIngrediente();
    this.agregarPaso();
  }
}
