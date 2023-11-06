import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthenticationService } from '../services/auth/authentication.service';
import { inject } from '@angular/core';
import { TokenService } from '../services/token/token.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const tokenService = inject(TokenService);
  const authService = inject(AuthenticationService);
  const user  = JSON.parse(tokenService.getItem('user'));
  const roles = route.data 
 
  if(user.client && roles && roles['role3'].includes('Client')){
    return true;
  } else if(user.employe && roles && roles['role'].includes(user.employe.role) || roles['role2'].includes(user.employe.role) ){
      return true
  }
  
  
  return false;
};
