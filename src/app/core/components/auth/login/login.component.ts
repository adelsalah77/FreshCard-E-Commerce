import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  errmsg: WritableSignal<string> = signal<string>('');
  isLoding: WritableSignal<boolean> = signal<boolean>(false);
  logInForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z][a-z0-9]{7,20}$/),
    ]),
  });

  submitloginform() {
    if (this.logInForm.valid) {
      this.isLoding.set(true);

      this.authService.logIn(this.logInForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.isLoding.set(false);
          localStorage.setItem('userToken', res.token);
          this.authService.decodeUserData();
          // Navigate to home after successful login prog routing
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.errmsg.set(err.error.message);
          this.isLoding.set(false);
          console.log(this.errmsg());
        },
      });
    }
  }

  showPasswordlogIn = false;

  togglePasswordlogIn() {
    this.showPasswordlogIn = !this.showPasswordlogIn;
  }
}
