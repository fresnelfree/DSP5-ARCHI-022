import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/auth/authentication.service';
import { inject } from '@angular/core';
import { RoleService } from '../services/role/role.service';
 
export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
   
  // const router      = inject(Router)
  // const token       = inject(TokenService)
  const authService = inject(AuthenticationService);
  // const roleService = inject(RoleService)
  
  return authService.isloggedIn();

};



// export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
   
//   // const router      = inject(Router)
//   const authService = inject(AuthenticationService);
//   // const token       = inject(TokenService)

//   return authService.isloggedIn();

// };
