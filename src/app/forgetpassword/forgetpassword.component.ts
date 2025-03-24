import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PrimengtoolsModule } from '../primengtools/primengtools.module';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';
import { SpinnerService } from '../services/spinner.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [PrimengtoolsModule, ReactiveFormsModule],  // Corrected imports
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.css'
})
export class ForgetpasswordComponent {
  IsLoading: boolean = false;
  forgetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  });
  constructor(private _AuthService: AuthService,
    private _MessageService: MessageService,
    private _SpinnerService: SpinnerService,
    private _TranslateService: TranslateService,) {

  }
  SendResetLink() {
    if (this.forgetPasswordForm.valid) {
      this.IsLoading = true;
      this._SpinnerService.show();

      this._AuthService.forgetpassword(this.forgetPasswordForm.value).subscribe({
        next: (response) => {
          this._MessageService.add({
            severity: 'success',
            summary: this._TranslateService.instant('MoToasterMessage.Success'),
            detail: this._TranslateService.instant('MoToasterMessage.UserSendResetToken'),
          });
          this.IsLoading = false;
          this._SpinnerService.hide();
          this.forgetPasswordForm.reset();
        },
        error: (error) => {
          console.error(error);
          this._MessageService.add({
            severity: 'error',
            summary: this._TranslateService.instant('MoToasterMessage.Error'),
            detail: this._TranslateService.instant('MoToasterMessage.UserSendResetTokenError'),
          });
          this.IsLoading = false;
          this._SpinnerService.hide();
        },
      });
    }
  }
}