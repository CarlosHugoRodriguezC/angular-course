import { Component, signal } from '@angular/core';

interface MenuItem {
  title: string;
  path: string;
}

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css'],
})
export class SideMenuComponent {
  public menuItems = signal<MenuItem[]>([
    {
      title: 'Counter',
      path: '/signals/counter',
    },
    {
      title: 'User Info',
      path: '/signals/user-info',
    },
    {
      title: 'Properties (Mutations)',
      path: '/signals/properties',
    },
  ]);
}
