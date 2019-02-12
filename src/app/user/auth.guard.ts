import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {  
    return this.checkLoggedIn(state.url);  // this is critical to return the CAN THEY ACTIVATE answer
  }

  canLoad(route: Route): boolean {
    return this.checkLoggedIn(route.path);
  }

  checkLoggedIn(url: string): boolean {
    if(this.authService.isLoggedIn) {
      return true;  // guard says okay, you may proceed
    }
    this.authService.redirectUrl = url;
    this.router.navigate(['/login']);
    return false;  // otherwise, kick them out
  }

}
