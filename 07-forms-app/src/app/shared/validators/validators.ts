import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';
import { Observable, delay, of } from 'rxjs';

export const firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
export const emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

export const cantBeStrider = (
  control: FormControl
): ValidationErrors | null => {
  const value = control.value?.trim().toLowerCase();
  if (value === 'strider') {
    return {
      noStrider: true,
    };
  }
  return null;
};

export const emailValidator = (
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
