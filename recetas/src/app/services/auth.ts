import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private apiUrl = '/api/users';
  private storageKey = 'currentUser';
  private currentUserSubject = new BehaviorSubject<User | null>(this.getCurrentUser());
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  register(user: User) {
    return this.http.get<User[]>(this.apiUrl).pipe(
      switchMap(users => {
        const maxId = users.length > 0 ? Math.max(...users.map(u => Number(u.id))) : 0;
        const newUser = { id: maxId + 1, username: user.username, password: user.password };
        return this.http.post<User>(this.apiUrl, newUser);
      })
    );
  }

  userExist(username: string) {
    return this.http.get<any[]>(`${this.apiUrl}?username=${username}`);
  }

  login(username: string, password: string): Observable<User[]> {
    return this.http
      .get<User[]>(`${this.apiUrl}?username=${username}&password=${password}`)
      .pipe(
        tap(users => {
          if (users.length > 0) {
            localStorage.setItem(this.storageKey, JSON.stringify(users[0]));
            this.currentUserSubject.next(users[0]);
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
