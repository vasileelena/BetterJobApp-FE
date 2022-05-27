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

  //TODO find method to get the roles in a not hardcoded way
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isUserLoggedIn() && sessionStorage.getItem('role') === 'RECRUITER')
      return true;

    this.router.navigate(['/login']).then(
      () => alert("You need to have a recruiter account to access this page!")
    );
    return false;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(route, state);
  }
}
