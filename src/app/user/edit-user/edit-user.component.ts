import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {CustomValidators} from "../../custom-validators";
import {RoleEnum, User} from "../../models/user.model";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  // @ts-ignore
  currentFile: File;
  // @ts-ignore
  selectedFiles: FileList;
  passRegex: RegExp = /^(?=.*\d)(?=.*[!.@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  roles: RoleEnum[] = [RoleEnum.USER, RoleEnum.RECRUITER];
  edit: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  get formControls() {
    return this.form.controls;
  }

  private initForm() {
    let userEmail = sessionStorage.getItem('email')!.toString();

    this.userService.getUserByEmail(userEmail).subscribe(
      (user: User) => {
        this.form = this.formBuilder.group(
          {
          //   "firstName": [user.firstName],
          //   "lastName": [user.lastName],
          //   "description": [user.description],
          //   "email": [user.email],
          //   "company": [user.company],
          //   "birthDate": [new Date(user.birthDate)]
          }
        )
      }
    );
  }

  selectFile(event: any) {
    this.selectedFiles = event.target.files;
  }

  onSubmit() {

  }

  onSubmitCv() {
    this.currentFile = this.selectedFiles.item(0)! ;
    let userEmail = sessionStorage.getItem('email')!.toString();

    this.userService.getUserByEmail(userEmail).subscribe(
      (user: User) => {
        let id = user.id;
        this.userService.uploadCv(this.currentFile, id).subscribe(
          () => console.log("success")
        );
      })


  }

}
