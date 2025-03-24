import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { LoginUser } from '../interfaces/user';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  registerURL = `${environment.apiUrl}/Accounts/register`;
  loginURL = `${environment.apiUrl}/Accounts/login`;
  forgetpasswordURL = `${environment.apiUrl}/Accounts/forgetpassword`;
  resetpasswordURL = `${environment.apiUrl}/Accounts/resetpassword`;
  getUserInfoURL = `${environment.apiUrl}/Accounts/getinfo`;
  googleCallbackURL = `${environment.apiUrl}/Accounts/GoogleCallback`;

  isLogged = new BehaviorSubject<boolean | null>(null);
  private userSource = new BehaviorSubject<LoginUser>({} as LoginUser);
  userDetails$ = this.userSource.asObservable();
  userToken$ = new BehaviorSubject<string | null>(null);

  constructor(
    private _HttpClient: HttpClient,
    private _Router: Router,
    private socialAuthService: SocialAuthService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const userToken = localStorage.getItem('usertoken');
      if (userToken) {
        this.decode(); // Decode the token and check if it's Google or normal
      } else {
        this.isLogged.next(false);
      }

      this.socialAuthService.authState.subscribe((user: SocialUser) => {
        if (user) {
          console.log(user);
          this.handleGoogleAuthResponse(user);
        }
      });
    }
  }

  decode(): void {
    const token = localStorage.getItem('usertoken');
    if (token) {
      try {
        console.log("Start Decode");

        this.userToken$.next(token);
        const decodedToken: any = jwtDecode(token);
        const userDetaills = JSON.parse(decodedToken.userDetaills);
        this.userSource.next(userDetaills as LoginUser);
        this.isLogged.next(true);
        this.userDetails$.subscribe((user: LoginUser | null) => {
          if (user) {
            console.log("User object: ", user); // Log the entire user object
            console.log("display Name: ", user.displayName); // Access DisplayName
            console.log("email: ", user.email); // Access Email
            console.log("picture URL: ", user.pictureUrl); // Access PictureUrl
          } else {
            console.log("User is null or undefined");
          }
        });
        console.log("finish Decode");

      } catch (error) {
        console.error("Invalid token format:", error);
        this.logout();
      }
    } else {
      this.logout();
    }
  }

  getUserInfo(): Observable<any> {
    return this._HttpClient.get(this.getUserInfoURL);
  }

  register(userdata: object): Observable<any> {
    return this._HttpClient.post(this.registerURL, userdata).pipe(
      map((user: any) => {
        if (user) {
          localStorage.setItem('usertoken', user.token);
          this.decode();
        }
      })
    );
  }

  login(userdata: object): Observable<any> {
    return this._HttpClient.post(this.loginURL, userdata).pipe(
      map((user: any) => {
        if (user) {
          localStorage.setItem('usertoken', user.token);
          this.decode();
        }
      })
    );
  }

  forgetpassword(userdata: object): Observable<any> {
    return this._HttpClient.post(this.forgetpasswordURL, userdata);
  }

  resetPassword(userdata: object): Observable<any> {
    return this._HttpClient.post(this.resetpasswordURL, userdata);
  }

  signInWithGoogle(): void {
    console.log("aaaa111");
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(user => {
      console.log("aaaa111");

      this.handleGoogleAuthResponse(user);
    });
  }

  handleGoogleAuthResponse(user: SocialUser): void {
    const payload = { token: user.idToken };
    this._HttpClient.post(this.googleCallbackURL, payload).subscribe(
      (response: any) => {
        // Store the server-issued token in localStorage
        localStorage.setItem('usertoken', response.token);
        this.decode();
      },
      error => console.error(error)
    );
  }

  signOutFromGoogle(): void {
    this.socialAuthService.signOut();
    this.logout();
  }

  logout(): void {
    this.socialAuthService.signOut();
    localStorage.removeItem('usertoken');
    this.isLogged.next(false);
    this.userToken$.next(null);
    this.userSource.next({} as LoginUser);
    this._Router.navigate(['/login']);
    console.log(this.isLogged.getValue());
    console.log(this.userToken$.getValue());
    console.log(this.userSource.getValue());
  }
}
