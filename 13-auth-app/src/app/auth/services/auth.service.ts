import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import {
  AuthStatus,
  CheckTokenResponse,
  LoginResponse,
  User,
} from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _http: HttpClient = inject(HttpClient);

  private readonly _apiUrl = environment.apiUrl;

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.Checking);

  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  constructor() {}

  public login(email: string, password: string): Observable<boolean> {
    const url = `${this._apiUrl}/auth/login`;
    const body = { email, password };

    return this._http.post<LoginResponse>(url, body).pipe(
      tap(({ user, token }) => {
        this._currentUser.set(user);
        this._authStatus.set(AuthStatus.Authenticated);
        localStorage.setItem('token', token);
        console.log({ user, token });
      }),
      map((_) => {
        return true;
      }),
      catchError((err) => {
        this._authStatus.set(AuthStatus.NotAuthenticated);
        return throwError(() => err.error.message);
      })
    );
  }

  public logout(): void {}

  public checkAuthStatus(): Observable<boolean> {
    const url = this._apiUrl + '/auth/check-token';

    const token = localStorage.getItem('token');

    if (!token) return of(false);

    const headers = new HttpHeaders();

    headers.set('Authorization', `Bearer ${token}`);

    return this._http.get<CheckTokenResponse>(url, { headers }).pipe(
      tap(({ user, token }) => {
        this._currentUser.set(user);
        this._authStatus.set(AuthStatus.Authenticated);
        localStorage.setItem('token', token);
        console.log({ user, token });
      }),
      map((_) => {
        return true;
      }),
      catchError((err) => {
        this._authStatus.set(AuthStatus.NotAuthenticated);
        return of(false);
      })
    );
  }
}
