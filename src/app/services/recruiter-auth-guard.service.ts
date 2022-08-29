import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "./auth.service";
import {RoleEnum} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class RecruiterAuthGuardService implements CanActivate, CanActivateChild {

  constructor(private router: Router,
              private authService: AuthService) {}


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.authService.isUserLoggedIn()){
      if (this.authService.isUserRecruiter())
        return true;

      this.router.navigate(['/user/search']).then(
        () => alert("You need to have a recruiter account to access this page!")
      );
      return false;
    }

    this.router.navigate(['/login']).then(
      () => alert("You need to have an account to access this page!")
    );
    return false;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(route, state);
  }
}
