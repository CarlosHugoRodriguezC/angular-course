import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: [],
})
export class DynamicPageComponent {
  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', [Validators.required, Validators.minLength(3)]],
      ['The Last of Us', [Validators.required, Validators.minLength(3)]],
      ['Final Fantasy VII', [Validators.required, Validators.minLength(3)]],
    ]),
  });

  public newFavorite: FormControl = new FormControl('', [Validators.required]);

  constructor(private fb: FormBuilder) {}

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  isValidField(field: string): boolean {
    return (
      Boolean(this.myForm.controls[field].errors) &&
      this.myForm.controls[field].touched
    );
  }

  getErrorMessage(field: string): string {
    const errors = this.myForm.controls[field].errors || {};

    const errorsKeys = Object.keys(errors);

    if (errorsKeys.includes('required'))
      return `The ${field} field is required`;
    if (errorsKeys.includes('minlength'))
      return `Min length is ${errors['minlength'].requiredLength} characters`;
    if (errorsKeys.includes('min')) return 'Min value is 0';

    return '';
  }

  isValidFieldInArray(formArray: FormArray, index: number) {
    return (
      formArray.controls[index].touched && formArray.controls[index].invalid
    );
  }

  getErrorMessageInArray(formArray: FormArray, index: number): string {
    const errors = formArray.controls[index].errors || {};

    const errorsKeys = Object.keys(errors);

    if (errorsKeys.includes('required')) return `The game field is required`;
    if (errorsKeys.includes('minlength'))
      return `Min length is ${errors['minlength'].requiredLength} characters`;

    return '';
  }

  removeFavoriteGame(index: number): void {
    this.favoriteGames.removeAt(index);
  }

  addFavoriteGame(): void {
    if (this.newFavorite.invalid) return;
    const newGame = this.newFavorite.value;

    this.favoriteGames.push(this.fb.control(newGame, [Validators.required]));
    this.newFavorite.reset();
  }

  onSave(): void {
    if (this.myForm.invalid) return this.myForm.markAllAsTouched();

    console.log(this.myForm.value);
    (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([]);
    this.myForm.reset();
  }
}
