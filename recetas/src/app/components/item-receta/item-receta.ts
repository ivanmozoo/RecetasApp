import { Component, Input } from '@angular/core';
import { Receta } from '../../interfaces/receta';

@Component({
  selector: 'app-item-receta',
  imports: [],
  templateUrl: './item-receta.html',
  styleUrl: './item-receta.css',
})
export class ItemReceta {
  @Input() receta!: Receta;
}
