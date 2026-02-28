import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private apiUrl = 'http://localhost:3000/users';
  private storageKey = 'currentUser';

  constructor(private http: HttpClient, private router: Router) { }

  register(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  login(username: string, password: string): Observable<User[]> {
    return this.http
      .get<User[]>(`${this.apiUrl}?username=${username}&password=${password}`)
      .pipe(
        tap(users => {
          if (users.length > 0) {
            localStorage.setItem(this.storageKey, JSON.stringify(users[0]));
          }
        })
      );
  }

  logout() {
    localStorage.removeItem(this.storageKey);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.storageKey);
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem(this.storageKey);
    return user ? JSON.parse(user) : null;
  }

}
