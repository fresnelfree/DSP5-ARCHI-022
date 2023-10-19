import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthenticationService } from '../services/auth/authentication.service';
import { inject } from '@angular/core';
import { RoleService } from '../services/role/role.service';
import { TokenService } from '../services/token/token.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const tokenService = inject(TokenService);
  const authService = inject(AuthenticationService);
  const user = JSON.parse(tokenService.getItem('user'));
  
  if (authService.isloggedIn()) {
    if (route.data && route.data['role'].includes(user.employe.role) || route.data['role2'].includes(user.employe.role)) {
      return true;
    }
  }

  return false;
};
