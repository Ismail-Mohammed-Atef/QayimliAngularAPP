import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {
  const platformId = inject(PLATFORM_ID);
  const router = inject(Router);
  if (isPlatformBrowser(platformId)) {
    const userToken = localStorage.getItem('usertoken');

    if (userToken != null /* && userToken.length === 52 */) {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
  }
  return false;
};
