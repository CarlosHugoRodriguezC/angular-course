import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]',
})
export class CustomLabelDirective implements OnInit {
  private htmlElement: ElementRef<HTMLElement>;
  private _color: string = 'red';
  private _errors?: ValidationErrors | null;

  @Input()
  set color(value: string) {
    this._color = value;
    this.setStyle();
  }

  @Input()
  set errors(value: ValidationErrors | null | undefined) {
    this._errors = value;
    console.log('errors', this._errors);
    this.setErrorMessage();
  }

  constructor(private el: ElementRef<HTMLElement>) {
    console.log('CustomLabelDirective');
    this.htmlElement = el;

    // this.htmlElement.nativeElement.innerHTML = 'Custom Label';
  }

  ngOnInit(): void {
    console.log('OnInit CustomLabelDirective');
  }

  setStyle() {
    this.htmlElement.nativeElement.style.color = this._color;
  }

  setErrorMessage(): void {
    if (!this._errors || this._errors === null) {
      this.htmlElement.nativeElement.classList.add('material-icons');
      this.htmlElement.nativeElement.innerHTML = 'check';
      this.color = 'green';
      this.htmlElement.nativeElement.style.color = this._color;

      return;
    }

    this.htmlElement.nativeElement.classList.remove('material-icons');
    this.color = 'red';
    this.htmlElement.nativeElement.style.color = this._color;

    const errors = Object.keys(this._errors || {});

    if (errors.includes('required')) {
      this.htmlElement.nativeElement.innerHTML = 'Campo requerido';
      return;
    }

    if (errors.includes('minlength')) {
      const requiredLength: number = this._errors!['minlength'].requiredLength;
      const actualLength: number = this._errors!['minlength'].actualLength;
      this.htmlElement.nativeElement.innerHTML = `El campo debe tener al menos ${requiredLength} caracteres, faltan ${
        requiredLength - actualLength
      } caracteres`;

      return;
    }

    if (errors.includes('email')) {
      this.htmlElement.nativeElement.innerHTML =
        'El campo debe ser un correo electrónico';
      return;
    }

    this.htmlElement.nativeElement.innerHTML = 'Campo no válido';
  }
}
