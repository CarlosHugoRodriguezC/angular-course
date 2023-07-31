import { Component } from '@angular/core';

interface MenuItem {
  label: string;
  route: string;
}

@Component({
  selector: 'maps-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css'],
})
export class SideMenuComponent {
  public menuItems: MenuItem[] = [
    { label: 'Full Screen', route: '/maps/full-screen' },
    { label: 'Markers', route: '/maps/markers' },
    { label: 'Zoom Range', route: '/maps/zoom-range' },
    { label: 'Propiedades', route: '/maps/properties' },
  ];
}
