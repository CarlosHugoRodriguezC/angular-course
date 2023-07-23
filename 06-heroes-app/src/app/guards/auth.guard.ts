import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  CanMatchFn,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { Observable, tap } from 'rxjs';

const checkAuthStatus = (): Observable<boolean> => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  return authService
    .checkAuthentication()
    .pipe(
      tap(
        (isAuthenticated) =>
          !isAuthenticated && router.navigate(['/auth/login'])
      )
    );
};

export const authCanActivate: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return checkAuthStatus();
};

export const authCanMatch: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  return checkAuthStatus();
};
