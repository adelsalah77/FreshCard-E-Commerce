import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { ResetnewpasswordComponent } from '../resetnewpassword/resetnewpassword.component';

@Component({
  selector: 'app-resetcode',
  imports: [ReactiveFormsModule, ResetnewpasswordComponent],
  templateUrl: './resetcode.component.html',
  styleUrl: './resetcode.component.scss',
})
export class ResetcodeComponent {
  resetCodeForm = new FormGroup({
    resetCode: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^[0-9]{4,}$/)],
    }),
  });

  errMsg: WritableSignal<string> = signal('');
  isLoding: WritableSignal<boolean> = signal(false);
  resetNewPasswordFlag: boolean = false;
  resetCodeFlag: boolean = true;

  authService: AuthService = inject(AuthService);

  submitResetCodeForm() {
    if (this.resetCodeForm.valid) {
      this.isLoding.set(true);
      const resetCode = this.resetCodeForm.get('resetCode')!.value;

      this.authService.verifyResetCode({ resetCode }).subscribe({
        next: (res) => {
          this.isLoding.set(false);
          // hide reset code component
          this.resetCodeFlag = false;
          // show reset new password component
          this.resetNewPasswordFlag = true;
        },
        error: (err) => {
          this.errMsg.set(err.error.message);
          this.isLoding.set(false);
        },
      });
    }
  }
}
