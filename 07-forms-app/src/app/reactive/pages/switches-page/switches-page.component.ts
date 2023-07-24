import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './switches-page.component.html',
  styles: [],
})
export class SwitchesPageComponent implements OnInit {
  public myForm: FormGroup = this.fb.group({
    gender: ['M', [Validators.required]],
    allowNotifications: [true, [Validators.required]],
    acceptTermsAndConditions: [false, [Validators.requiredTrue]],
  });

  public person = {
    gender: 'F',
    allowNotifications: false,
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.myForm.reset({ ...this.person });
  }

  onSubmit() {
    if (this.myForm.invalid) return this.myForm.markAllAsTouched();
    console.log(this.myForm.value);
    const { acceptTermsAndConditions, ...newPerson } = this.myForm.value;
    this.person = newPerson;
    console.log(this.person);
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

    if (errorsKeys.includes('required') && field === 'acceptTermsAndConditions')
      return `You must accept the terms and conditions`;
    if (errorsKeys.includes('required'))
      return `The ${field} field is required`;

    return '';
  }
}
