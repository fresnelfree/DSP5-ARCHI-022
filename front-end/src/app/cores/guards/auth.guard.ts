import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/auth/authentication.service';
import { TokenService } from '../services/token/token.service';
import { inject } from '@angular/core';
 

export const authGuard: CanActivateFn = (route, state) => {
  return true;
};

// export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
   
//   const router      = inject(Router)
//   const authService = inject(AuthenticationService);
//   const token       = inject(TokenService)

//   return authService.isloggedIn();

// };
