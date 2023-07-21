import { Component } from '@angular/core';
import { Publisher } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [],
})
export class NewPageComponent {
  public publishers = Object.values(Publisher).map((publisher) => ({
    id: publisher.replace(' ', '_').toLowerCase(),
    name: publisher,
  }));
}
