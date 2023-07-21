import { Component } from '@angular/core';
import { Color, Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'products-order',
  templateUrl: './order.component.html',
  styles: [],
})
export class OrderComponent {
  public isUpperCase = false;
  public order: 'asc' | 'desc' = 'asc';
  public orderBy: keyof Hero = 'name';

  public heroes: Hero[] = [
    {
      name: 'Superman',
      canFly: true,
      color: Color.blue,
    },
    {
      name: 'Batman',
      canFly: false,
      color: Color.black,
    },
    {
      name: 'Robin',
      canFly: false,
      color: Color.green,
    },
    {
      name: 'Flash',
      canFly: false,
      color: Color.red,
    },
  ];

  public toggleUppercase() {
    this.isUpperCase = !this.isUpperCase;
  }

  setOrder(value: 'asc' | 'desc') {
    this.order = value;
  }
  setOrderBy(value: keyof Hero) {
    if (this.orderBy === value) {
      this.setOrder(this.order === 'asc' ? 'desc' : 'asc');
      return;
    }
    this.setOrder('asc');
    this.orderBy = value;
  }
}
