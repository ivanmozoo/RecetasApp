import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormControl, FormArray, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
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
    MatIconModule
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
    imagenCtrl: ['', Validators.required],
  });

  tipoFormGroup = this._formBuilder.group({
    tipoCtrl: ['', Validators.required],
  });

  pasosFormGroup = this._formBuilder.group({
    cantidadPasosCtrl: [1, [Validators.required, Validators.min(1)]]
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

  pasos: any[] = [];

  generarPasos() {
    const cantidad = this.pasosFormGroup.get('cantidadPasosCtrl')?.value || 1;
    this.pasos = [];
    for (let i = 0; i < cantidad; i++) {
      this.pasos.push(this._formBuilder.control('', Validators.required));
    }
  }

  private _cdr = inject(ChangeDetectorRef);
  foto: { image?: string } = {};

  changeImage(inputFile: HTMLInputElement) {
    const file = inputFile.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Solo se permiten imágenes');
        inputFile.value = '';
        this.foto.image = undefined;
        this.imagenFormGroup.get('imagenCtrl')?.setValue(null);
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.foto.image = reader.result as string;
        this._cdr.detectChanges();
      };
      reader.readAsDataURL(file);
    } else {
      this.foto.image = undefined;
      this.imagenFormGroup.get('imagenCtrl')?.setValue(null);
    }
  }

  resetFormulario(stepper: any, fileInput?: HTMLInputElement) {
    stepper.reset();
    this.nombreFormGroup.reset();
    this.descripcionFormGroup.reset();
    this.imagenFormGroup.reset();
    this.tipoFormGroup.reset();
    this.pasosFormGroup.reset();
    this.pasosFormGroup.get('cantidadPasosCtrl')?.setValue(1);
    this.ingredientesArray.clear();
    this.agregarIngrediente();
    this.pasos = [];
    this.foto = {};
    if (fileInput) {
      fileInput.value = '';
    }
  }

  constructor() {
    this.agregarIngrediente();
  }



}
