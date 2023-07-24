import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './basic-page.component.html',
  styles: [],
})
export class BasicPageComponent implements OnInit {
  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // this.myForm.reset({ name: 'Product', price: 0, inStorage: 0 });
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



  onSave(): void {
    if (this.myForm.invalid) return this.myForm.markAllAsTouched();

    console.log(this.myForm.value);
    this.myForm.reset({ name: '', price: 0, inStorage: 0 });
  }
}
