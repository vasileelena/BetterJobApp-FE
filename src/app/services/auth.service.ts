import { Injectable } from '@angular/core';
import {UserService} from "./user.service";
import {RoleEnum, User} from "../models/user.model";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {  }

  public login(userInputs: {email: string, password: string}): Observable<User> {
    return this.http.post<User>(environment.apiBaseUrl + '/login', userInputs);
  }

  isUserLoggedIn(): boolean {
    if(sessionStorage.getItem('email') === null) {
      return false;
    }
    if(sessionStorage.getItem('email')!.toString() === '')
      return false;

    return true;

  }

  isUserRecruiter(): boolean {
    if(this.isUserLoggedIn()) {
      if(sessionStorage.getItem('role') === 'RECRUITER'){
        return true;
      }
        return false;
    }
    return false;
  }

  logOut(): void {
    sessionStorage.setItem('email', '');
    sessionStorage.setItem('role', '');
    this.router.navigate(['/']);
  }
}
