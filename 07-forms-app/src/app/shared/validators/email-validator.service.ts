import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable, delay, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmailValidatorService {
  constructor() {}

  emailValidator = (
    control: AbstractControl
  ): Observable<ValidationErrors | null> => {
    const email = control.value;

    const httpCallObsevable = new Observable<ValidationErrors | null>(
      (subscriber) => {
        console.log({ email });
        if (email === 'fernando@google.com') {
          subscriber.next({ emailExists: true });
          subscriber.complete();
        }

        subscriber.next(null);
        subscriber.complete();
      }
    );

    return httpCallObsevable.pipe(delay(2000));
  };
}
