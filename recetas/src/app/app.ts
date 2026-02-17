import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RecetasShow } from "./components/recetas-show/recetas-show";
import { RecetasNavbar } from "./components/recetas-navbar/recetas-navbar";
import { RecetasFooter } from "./components/recetas-footer/recetas-footer";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RecetasShow, RecetasNavbar, RecetasFooter],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('recetas');
}
