import { AuthService } from './../../../services/auth/auth.service';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  errmsg: WritableSignal<string> = signal<string>('');
  isLodiing: WritableSignal<boolean> = signal<boolean>(false);
  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Z][a-z0-9]{7,20}$/),
      ]),
      rePassword: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    },
    this.passwordMatchValidator,
  );

  submitregisterform() {
    if (this.registerForm.valid) {
      this.isLodiing.set(true);

      this.authService.signUp(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.isLodiing.set(false);
          localStorage.setItem('userToken', res.token);
          this.authService.decodeUserData();
          // Navigate to home after successful registration prog routing
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.errmsg.set(err.error.message);
          this.isLodiing.set(false);
          console.log(this.errmsg());
        },
      });
    }
  }

  passwordMatchValidator(x: AbstractControl) {
    if (x.get('password')?.value === x.get('rePassword')?.value) {
      return null;
    } else {
      x.get('rePassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
  }

  showPassword = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  showPassword1 = false;

  togglePassword1() {
    this.showPassword1 = !this.showPassword1;
  }
}
