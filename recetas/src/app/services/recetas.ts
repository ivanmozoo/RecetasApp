import { Injectable } from '@angular/core';
import { Receta } from '../interfaces/receta';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Recetas {

  private apiUrl = 'http://34.233.232.187:3000/recetas';

  constructor(private http: HttpClient) { }

  getRecetas(): Observable<Receta[]> {
    return this.http.get<Receta[]>(this.apiUrl);
  }

  getRecetaById(id: string): Observable<Receta> {
    return this.http.get<Receta>(`${this.apiUrl}/${id}`);
  }

  crearReceta(receta: any): Observable<Receta> {
    return this.http.post<any>(this.apiUrl, receta);
  }

  deleteReceta(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateReceta(id: string, receta: Receta): Observable<Receta> {
  return this.http.put<Receta>(`${this.apiUrl}/${id}`, receta);
}
}
