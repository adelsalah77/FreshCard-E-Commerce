import { AuthService } from './../../services/auth/auth.service';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if (authService.userData() != null) {
    return true;
  }
  router.createUrlTree(['/login']);
  return false;
};
