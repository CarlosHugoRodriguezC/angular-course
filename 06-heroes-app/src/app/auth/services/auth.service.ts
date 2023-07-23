import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from 'src/environments/environments';
import { User } from '../interfaces/user.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl: string = environments.baseUrl;
  private user?: User;

  constructor(private http: HttpClient) {}

  get currentUser(): User | undefined {
    if (!this.user) return undefined;
    return structuredClone(this.user);
  }

  login(email: string, password: string): Observable<User> {
    // return this.http.post<User>(`${this.baseUrl}/login`, { email, password });
    return this.http.get<User>(`${this.baseUrl}/users/1`).pipe(
      tap((user) => {
        this.user = user;
      }),
      tap((user) => {
        localStorage.setItem(
          'user',
          JSON.stringify({ ...user, token: 'aeokdakd.FLASKJDFALSD' })
        );
      })
    );
  }

  logout(): void {
    this.user = undefined;
    localStorage.removeItem('user');
  }

  checkAuthentication(): Observable<boolean> {
    const user = localStorage.getItem('user');
    if (!user) return of(false);

    this.user = JSON.parse(user);

    return this.http.get<User>(`${this.baseUrl}/users/1`).pipe(
      tap((user) => (this.user = user)),
      map((user) => Boolean(user)),
      catchError((err) => of(false))
    );
  }
}
