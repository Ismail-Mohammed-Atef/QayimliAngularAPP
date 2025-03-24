
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimengtoolsModule } from '../primengtools/primengtools.module';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { SpinnerService } from '../services/spinner.service';
import { isPlatformBrowser } from '@angular/common';
import { SocialAuthService, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [PrimengtoolsModule, ReactiveFormsModule, GoogleSigninButtonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(5)]),
    confirmPassword: new FormControl(null, [Validators.required]),
    displayname: new FormControl(null, [Validators.required, Validators.minLength(5)]),
    phonenumber: new FormControl(null, [Validators.required, Validators.minLength(5)]),
  });
  constructor(private _AuthService: AuthService, private messageService:
    MessageService, private _Router: Router, private spinnerService: SpinnerService,
    private router: Router,
    private socialAuthService: SocialAuthService,
    @Inject(PLATFORM_ID) private platformId: any) {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('usertoken') != null) {
        this._Router.navigate(['/home']);
      }
    }
    this.socialAuthService.authState.subscribe((user) => {
      if (user) {
        console.log(user);
        // this.authService.handleGoogleAuthResponse(user);
        this.router.navigate(['/home']);
      }
    });
  }
  passwordsMatch(): boolean {
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;
    return password === confirmPassword;
  }
  IsLoading: boolean = false;
  RegisterError: string = "";
  Register(registerdetails: FormGroup) {
    if (this.registerForm.valid && this.passwordsMatch()) {
      this.IsLoading = true;
      this.spinnerService.show();
      this._AuthService.register(registerdetails.value).subscribe({
        next: (response) => {
          this.IsLoading = false;
          this.spinnerService.hide();
          this.messageService.add({ severity: 'success', summary: 'تسجيل حساب جديد', detail: response });
          registerdetails.reset();
          this._Router.navigate(['/login'])
        },
        error: (error) => {
          this.RegisterError = error.message
          console.log(error)
          this.messageService.add({ severity: 'error', summary: 'تسجيل حساب جديد', detail: error.message });
          this.IsLoading = false;
          this.spinnerService.hide();
        }
      })
    }
  }
  signInWithGoogle(): void {
    this._AuthService.signInWithGoogle();
  }
}