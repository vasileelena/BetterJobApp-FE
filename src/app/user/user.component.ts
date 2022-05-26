import { Component, OnInit } from '@angular/core';
import {RoleEnum, User} from "./user.model";
import {UserService} from "../service/user.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: User[] = [];

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('role') === 'RECRUITER') {
      this.router.navigate(['recruiter/job']);
    }
  }

  public getUsers(): void {
    this.userService.getUsers().subscribe(
      (response: User[]) => {
        this.users = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
  }

}
