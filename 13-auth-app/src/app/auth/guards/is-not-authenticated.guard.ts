import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStatus } from '../interfaces';
import { AuthService } from '../services/auth.service';

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.authStatus() === AuthStatus.NotAuthenticated) {
    return true;
  }
  // const url = state.url;
  // localStorage.setItem('redirectUrl', state.url);
  if (authService.authStatus() === AuthStatus.Checking) {
    return false;
  }

  router.navigate(['/dashboard']);

  return false;
};