import { Component, computed, inject } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-dashboard-layou',
  templateUrl: './dashboard-layou.component.html',
  styleUrls: ['./dashboard-layou.component.css'],
})
export class DashboardLayouComponent {
  private authService = inject(AuthService);

  public user = computed(() => this.authService.currentUser());

  onLogout() {
    this.authService.logout();
  }
}
