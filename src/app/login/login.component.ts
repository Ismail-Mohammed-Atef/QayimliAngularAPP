import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { PrimengtoolsModule } from '../primengtools/primengtools.module';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../services/auth.service';
import { SpinnerService } from '../services/spinner.service';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { LoginUser } from '../interfaces/user';
import { SocialAuthService, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [PrimengtoolsModule, ReactiveFormsModule, GoogleSigninButtonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  IsLoading: boolean = false;
  LoginError: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private spinnerService: SpinnerService,
    private translateService: TranslateService,
    private router: Router,
    private socialAuthService: SocialAuthService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.loginFormGroup = this.fb.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
      ]),
    });

    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('usertoken') != null) {
        this.router.navigate(['/home']);
      }
    }
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('usertoken') != null) {
        this.router.navigate(['/home']);
      }
    }

    // Subscribe to Google auth state
   this.socialAuthService.authState.subscribe((user) => {
      if (user) {
        console.log(user);
       // this.authService.handleGoogleAuthResponse(user);
        this.router.navigate(['/home']);
      }
    }); 
  }

  Login() {
    if (this.loginFormGroup.valid) {
      this.IsLoading = true;
      this.spinnerService.show();

      this.authService.login(this.loginFormGroup.value).subscribe({
        next: (response) => {
          
          this.authService.userDetails$.subscribe((user: LoginUser) => {
            const displayName = user.displayName || 'User';
            this.messageService.add({
              severity: 'success',
              summary: this.translateService.instant('MoToasterMessage.Success'),
              detail: this.translateService.instant('MoToasterMessage.UserLogin', {
                Name: displayName,
                WebsiteName: this.translateService.instant('MoCommon.WebsiteName')
              }),
            });
          });

          this.IsLoading = false;
          this.spinnerService.hide();
          this.loginFormGroup.reset();
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.LoginError = error;
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: this.translateService.instant('MoToasterMessage.Error'),
            detail: this.translateService.instant('MoToasterMessage.UserLoginError'),
          });
          this.IsLoading = false;
          this.spinnerService.hide();
        },
      });
    }
  }
  signInWithGoogle(): void {
    this.authService.signInWithGoogle();
  }
}
