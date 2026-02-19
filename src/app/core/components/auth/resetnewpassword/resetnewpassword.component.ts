import { Component, inject, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetnewpassword',
  imports: [ReactiveFormsModule],
  templateUrl: './resetnewpassword.component.html',
  styleUrl: './resetnewpassword.component.scss',
})
export class ResetnewpasswordComponent {
  resetNewpasswordForm = new FormGroup({
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    newPassword: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{7,20}$/)],
    }),
  });

  errMsg: WritableSignal<string> = signal('');
  isLoding: WritableSignal<boolean> = signal(false);

  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  submitResetNewPasswordForm() {
    if (this.resetNewpasswordForm.valid) {
      this.isLoding.set(true);
      const email = this.resetNewpasswordForm.get('email')!.value;
      const newPassword = this.resetNewpasswordForm.get('newPassword')!.value;

      this.authService.resetNewPassword({ email, newPassword }).subscribe({
        next: (res) => {
          this.isLoding.set(false);
          localStorage.setItem('userToken', res.token);
          this.authService.decodeUserData();
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.errMsg.set(err.error.message);
          this.isLoding.set(false);
        },
      });
    }
  }

  showPasswordReset = false;

  togglePasswordReset() {
    this.showPasswordReset = !this.showPasswordReset;
  }
}
