import { Component } from '@angular/core';

interface MenuItem {
  title: string;
  route: string;
}

@Component({
  selector: 'shared-side-menu',
  templateUrl: './side-menu.component.html',
  styles: [],
})
export class SideMenuComponent {
  public reactiveMenu: MenuItem[] = [
    {
      title: 'Bacics',
      route: './reactive/basics',
    },
    {
      title: 'Dynamics',
      route: './reactive/dynamic',
    },
    {
      title: 'Switches',
      route: './reactive/switches',
    },
  ];

  public authMenu: MenuItem[] = [
    {
      title: 'Register',
      route: './auth/sign-up',
    },
  ];
}
