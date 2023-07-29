import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidatorsService {
  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  public cantBeStrider = (control: FormControl): ValidationErrors | null => {
    const value = control.value?.trim().toLowerCase();
    if (value === 'strider') {
      return {
        noStrider: true,
      };
    }
    return null;
  };

  public isValidField(form: FormGroup, field: string): boolean | null {
    return form.controls[field].errors && form.controls[field].touched;
  }

  public fieldsMatch(fieldOne: string, fieldTwo: string): ValidatorFn {
    return (form: AbstractControl): ValidationErrors | null => {
      const areMatching =
        form.get(fieldOne)?.value === form.get(fieldTwo)?.value;

      if (!areMatching) {
        form.get(fieldTwo)?.setErrors({ notMatching: true });
        return { passwordsNotMatching: true };
      }

      form.get(fieldTwo)?.setErrors(null);
      return null;
    };
  }
}
