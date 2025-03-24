import { HttpInterceptorFn } from '@angular/common/http';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

// Standalone Interceptor
export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  const authService = inject(AuthService); // Inject your auth service here

  let token: string | null = null;
  let language: string | null = null;

  if (isPlatformBrowser(platformId)) {
    token = localStorage.getItem('usertoken');
    language = localStorage.getItem('Language');
  }

  let headers = new HttpHeaders();
  headers = headers.set('Content-Type', 'application/json');
  headers = headers.set('Access-Control-Allow-Origin', '*');
  headers = headers.set('Access-Control-Allow-Methods', '*');
  headers = headers.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  headers = headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');

  // Add the security headers
  headers = headers.set('X-Content-Type-Options', 'nosniff');
  headers = headers.set('Content-Security-Policy', "script-src https: 'unsafe-inline' 'unsafe-eval'; style-src https: 'unsafe-inline' 'unsafe-eval'; img-src https: data:; font-src https: data:");

  if (language) {
    headers = headers.set('lang', language);
  } else {
    headers = headers.set('lang', 'ar');
  }

  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }

  const updatedRequest = req.clone({
    headers: headers
  });

  return next(updatedRequest).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        // Handle successful responses here if needed
      }
    }),
    catchError((error) => {
      // Check for specific error response structure
      if (error.status === 401 || (error.error && error.error.statusCode === 401 && error.error.message === "Unauthorized")) {
        // Perform logout
        authService.logout(); // Call the logout method from your auth service
      }
      return throwError(() => error); // Rethrow the error to be handled elsewhere
    })
  );
};
