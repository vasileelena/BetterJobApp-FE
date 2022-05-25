import { Injectable } from '@angular/core';
import {UserService} from "./user.service";
import {User} from "../user/user.model";
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

  isUserLoggedIn() {
    let email = sessionStorage.getItem('email');
    return !(email === '')
  }

  logOut() {
    sessionStorage.setItem('email', '');
    sessionStorage.setItem('role', '');
    this.router.navigate(['/']);
  }
}
