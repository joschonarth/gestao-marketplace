import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user';
import { Router } from '@angular/router';

const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  return password === confirmPassword ? null : { passwordMismatch: true };
};

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  registerErrorMessage = '';

  userForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    { validators: passwordMatchValidator },
  );

  private readonly _userService = inject(UserService);
  private readonly _router = inject(Router);

  register() {
    if (this.userForm.invalid) return;

    this._userService
      .register(
        this.userForm.get('name')?.value as string,
        this.userForm.get('email')?.value as string,
        this.userForm.get('password')?.value as string,
      )
      .subscribe({
        next: () => {
          this.registerErrorMessage = '';

          this._router.navigate(['/login']);
        },
        error: (error) => {
          this.registerErrorMessage = error.error.message;
        },
      });
  }
}
