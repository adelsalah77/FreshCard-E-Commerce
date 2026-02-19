import { AuthService } from './../../../services/auth/auth.service';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { subscribe } from 'diagnostics_channel';
import { ResetcodeComponent } from '../resetcode/resetcode.component';

@Component({
  selector: 'app-forgetpassword',
  imports: [ReactiveFormsModule, ResetcodeComponent],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss',
})
export class ForgetpasswordComponent {
  forgetPasswordForm = new FormGroup({
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
  });

  errMsg: WritableSignal<string> = signal('');
  isLoding: WritableSignal<boolean> = signal(false);
  forgetPasswordFlag: boolean = true;
  resetCodeFlag: boolean = false;

  authService: AuthService = inject(AuthService);

  submitForgetPasswordForm() {
    if (this.forgetPasswordForm.valid) {
      this.isLoding.set(true);
      const email = this.forgetPasswordForm.get('email')!.value;

      this.authService.forgetPassword({ email }).subscribe({
        next: (res) => {
          this.isLoding.set(false);
          // hide forget password component
          this.forgetPasswordFlag = false;
          // show reset code component
          this.resetCodeFlag = true;
        },
        error: (err) => {
          this.errMsg.set(err.error.message);
          this.isLoding.set(false);
        },
      });
    }
  }
}
