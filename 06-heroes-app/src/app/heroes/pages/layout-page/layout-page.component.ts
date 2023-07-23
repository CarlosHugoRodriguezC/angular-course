import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [],
})
export class LayoutPageComponent {
  public sidebarItems = [
    {
      label: 'Listado',
      icon: 'list',
      link: './list',
    },
    {
      label: 'Agregar',
      icon: 'add',
      link: './new',
    },
    {
      label: 'Buscar',
      icon: 'search',
      link: './search',
    },
  ];

  constructor(private authService: AuthService, private router: Router) {}

  get user(): User | undefined {
    return this.authService.currentUser;
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
