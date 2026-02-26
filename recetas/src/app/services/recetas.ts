import { Injectable } from '@angular/core';
import { Receta } from '../interfaces/receta';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Recetas {

  private apiUrl = 'http://localhost:3000/recetas';

  constructor(private http: HttpClient) { }

  getRecetas(): Observable<Receta[]> {
    return this.http.get<Receta[]>(this.apiUrl);
  }

  getRecetaById(id: number): Observable<Receta> {
    return this.http.get<Receta>(`${this.apiUrl}/${id}`);
  }
}
