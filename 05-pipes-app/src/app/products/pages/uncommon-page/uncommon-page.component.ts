import { Component } from '@angular/core';
import { Observable, interval, tap } from 'rxjs';

@Component({
  selector: 'app-uncommon-page',
  templateUrl: './uncommon-page.component.html',
  styleUrls: ['./uncommon-page.component.css'],
})
export class UncommonPageComponent {
  // i18n select
  public name: string = 'John';
  public gender: 'male' | 'female' = 'male';

  public invitationMap = {
    male: 'invitarlo',
    female: 'invitarla',
  };

  changeClient() {
    if (this.name !== 'John') {
      this.name = 'John';
      this.gender = 'male';
      return;
    }

    this.name = 'Mary';
    this.gender = 'female';
  }

  // i18n plural
  public clients: string[] = ['John', 'Mary', 'Peter', 'Lucy', 'Mark'];
  public clientsMap: { [key: string]: string } = {
    '=0': 'No tenemos ningún cliente esperando.',
    '=1': 'Tenemos un cliente esperando.',
    other: 'Tenemos # clientes esperando.',
  };

  addClient() {
    this.clients.push('New client');
  }
  removeClient() {
    this.clients.pop();
  }

  // key value pipe
  public person = {
    name: 'John',
    age: 35,
    address: 'New York',
  };
  // async pipe
  public myObservableTimer: Observable<number> = interval(2000).pipe(
    tap(console.log)
  );

  public promiseValue: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Promise solved');
    }, 3500);
  });
}
