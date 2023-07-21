import { Component } from '@angular/core';

@Component({
  templateUrl: './basics-page.component.html',
  styleUrls: ['./basics-page.component.css'],
})
export class BasicsPageComponent {
  public nameLower: string = 'carlos';
  public nameUpper: string = 'CARLOS';
  public fullName: string = 'carLos RoDRígueZ';
  public customDate: Date = new Date();
}
