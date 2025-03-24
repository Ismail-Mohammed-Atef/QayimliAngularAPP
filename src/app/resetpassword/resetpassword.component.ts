import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimengtoolsModule } from '../primengtools/primengtools.module';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerService } from '../services/spinner.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-resetpassword',
  standalone: true,
  imports: [
    PrimengtoolsModule,
    ReactiveFormsModule // Add this to enable reactive forms
  ],
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  IsLoading: boolean = false;
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _AuthService: AuthService,
    private _Router: Router,
    private spinner: SpinnerService,
    private _MessageService: MessageService,
    private _TranslateService: TranslateService
  ) {
    if (localStorage.getItem('usertoken') != null) {
      this._Router.navigate(['/home']);
    }
  }

  resetpasswordform: FormGroup = new FormGroup({
    token: new FormControl(null, [
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25)
    ]),
    confirmPassword: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25)
    ])
  });

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((params) => {
      this.resetpasswordform.patchValue({
        token: params.get('mostafa')
      });
    });
    console.log(this.resetpasswordform);
  }
  passwordsMatch(): boolean {
    const password = this.resetpasswordform.get('password')?.value;
    const confirmPassword = this.resetpasswordform.get('confirmPassword')?.value;
    return password === confirmPassword;
  }
  SubmitResetPassword() {
    console.log(this.resetpasswordform);

    if (this.resetpasswordform.valid && this.passwordsMatch()) {
      this.IsLoading = true;
      this.spinner.show();
      const resetData = this.resetpasswordform.value;
      this._AuthService.resetPassword(resetData).subscribe(
        (response) => {
          this._MessageService.add({
            severity: 'success',
            summary: this._TranslateService.instant('MoToasterMessage.Success'),
            detail: this._TranslateService.instant('MoToasterMessage.UserResetPassword'),
          });
          this._Router.navigate(['/login']);
          this.IsLoading = false;
          this.spinner.hide();
        },
        (error) => {
          this._MessageService.add({
            severity: 'error',
            summary: this._TranslateService.instant('MoToasterMessage.Error'),
            detail: this._TranslateService.instant('MoToasterMessage.UserResetPasswordError'),
          });
          this.IsLoading = false;
          this.spinner.hide();
        }
      );
    }
  }
}
