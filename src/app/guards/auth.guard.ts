import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Auth } from 'aws-amplify';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return Auth.currentAuthenticatedUser()
      .then(user => {
        console.log(user);
        return true;
      })
      .catch(err => {
        console.log(err);
        this.router.navigate(['/login'], {
          queryParams: { returnUrl: state.url }
        });
        return false;
      });
  }
}
