import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
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
    MatSelectModule
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

  ingredientesFormGroup = this._formBuilder.group({
    cantidadIngCtrl: [1, [Validators.required, Validators.min(1)]]
  });

   pasosFormGroup = this._formBuilder.group({
    cantidadPasosCtrl: [1, [Validators.required, Validators.min(1)]]
  });

  ingredientes: FormControl[] = [];
  pasos: FormControl[] = [];

  generarIngredientes() {
    const cantidad = this.ingredientesFormGroup.get('cantidadIngCtrl')?.value || 1;
    this.ingredientes = [];
    for (let i = 0; i < cantidad; i++) {
      this.ingredientes.push(new FormControl('', Validators.required));
    }
  }

  generarPasos() {
    const cantidad = this.pasosFormGroup.get('cantidadPasosCtrl')?.value || 1;
    this.pasos = [];
    for (let i = 0; i < cantidad; i++) {
      this.pasos.push(new FormControl('', Validators.required));
    }
  }

  resetFormulario(stepper: any) {
    stepper.reset();
    this.nombreFormGroup.reset();
    this.descripcionFormGroup.reset();
    this.imagenFormGroup.reset();
    this.tipoFormGroup.reset();
    this.ingredientesFormGroup.reset();
    this.ingredientesFormGroup.get('cantidadIngCtrl')?.setValue(1);
    this.pasosFormGroup.reset();
    this.pasosFormGroup.get('cantidadPasosCtrl')?.setValue(1);
    this.ingredientes = [];
  }



}
