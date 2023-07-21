import { Component } from '@angular/core';

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
    }
  ];
}
