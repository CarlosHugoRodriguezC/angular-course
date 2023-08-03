import { Component, OnDestroy, effect, signal } from '@angular/core';
import { User } from '../../interfaces/user-request.interface';
import { first } from 'rxjs';

@Component({
  templateUrl: './properties-page.component.html',
  styleUrls: ['./properties-page.component.css'],
})
export class PropertiesPageComponent implements OnDestroy {

  public counter = signal<number>(10);
  public user = signal<User>({
    first_name: 'John',
    last_name: 'Doe',
    avatar: 'https://via.placeholder.com/150',
    email: 'jhonDoe@mail.com',
    id: 1,
  });

  public userChangeEffect = effect(() => {
    console.log('user changed effect triggered');
    console.log(`${this.user().first_name} - ${this.counter()}` );
  });

  ngOnDestroy(): void {
    // this.userChangeEffect.destroy();
  }

  onFieldUpdated(field: keyof User, value: string): void {
    //  this.user.set({ ...this.user(), [field]: value });
    this.user.update((current) => ({ ...current, [field]: value }));
    // this.user.mutate((current) => {
    //   switch (field) {
    //     case 'first_name':
    //       current[field] = value;
    //       break;
    //     case 'last_name':
    //       current[field] = value;
    //       break;
    //     case 'avatar':
    //       current[field] = value;
    //       break;
    //     case 'email':
    //       current[field] = value;
    //       break;
    //     case 'id':
    //       current[field] = Number(value);
    //       break;
    //   }
    // });
  }

  increaseBy(value: number): void {
    this.counter.update((current) => current + value);
  }
}
