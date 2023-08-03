import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface MenuItem {
  label: string;
  route: string;
}

@Component({
  selector: 'side-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css'],
})
export class SideMenuComponent {
  public menuItems: MenuItem[] = [
    { label: 'Full Screen', route: '/maps/full-screen' },
    { label: 'Zoom Range', route: '/maps/zoom-range' },
    { label: 'Markers', route: '/maps/markers' },
    { label: 'Propiedades', route: '/maps/properties' },
    { label: 'Alone Page', route: '/alone' },
  ];
}
