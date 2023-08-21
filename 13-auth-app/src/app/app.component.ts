import { Component, computed, effect, inject } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { Router } from '@angular/router';
import { AuthStatus } from './auth/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    console.log('AppComponent constructor');
    this.authService.checkAuthStatus().subscribe();
  }

  public finishedAuthCheck = computed<boolean>(() => {
    if (this.authService.authStatus() === AuthStatus.Checking) {
      return false;
    }

    return true;
  });

  public authStatusChangedEffect = effect(() => {
    console.log('authStatusChangedEffect', {
      authStatus: this.authService.authStatus(),
    });

    switch (this.authService.authStatus()) {
      case AuthStatus.Checking:
        return;

      case AuthStatus.NotAuthenticated:
        this.router.navigate(['/auth']);
        return;

      case AuthStatus.Authenticated:
        this.router.navigate(['/dashboard']);
        return;

      default:
        return;
    }
  });
}
