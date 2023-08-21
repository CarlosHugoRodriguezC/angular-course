import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import iziToast from 'izitoast';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  private _fb = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);

  public loginForm = this._fb.group({
    email: ['cahuroca.aw@gmail.com', [Validators.required, Validators.email]],
    password: ['pass_good', [Validators.required, Validators.minLength(6)]],
  });

  public onSubmit(): void {
    if (this.loginForm.invalid) return;
    const { email, password } = this.loginForm.value;
    this._authService.login(email!, password!).subscribe({
      next: (loggedIn) => {
        this._router.navigate(['/dashboard/']);
      },
      error: (err) => {
        // iziToast.show({
        //   title: 'Error',
        //   message: err,
        //   color: 'red',
        // });
        console.log( err );
      },
    });
  }
}
