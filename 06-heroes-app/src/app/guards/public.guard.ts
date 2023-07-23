import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

const checkAuthStatus = (): Observable<boolean> => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  return authService.checkAuthentication().pipe(
    tap((isAuthenticated) => isAuthenticated && router.navigate(['/'])),
    map((isAuthenticated) => !isAuthenticated)
  );
};

export const publicCanActivate: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return checkAuthStatus();
};

export const publicCanMatch: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return checkAuthStatus();
};
