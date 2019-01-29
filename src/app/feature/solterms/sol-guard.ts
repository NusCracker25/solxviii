import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '@core/auth.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { auth } from 'firebase';


@Injectable({
  providedIn: 'root',
})
export class SolGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean  {
     if (this.auth.authenticated) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
