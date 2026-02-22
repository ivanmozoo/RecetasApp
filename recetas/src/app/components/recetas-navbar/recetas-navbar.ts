import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

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
}
