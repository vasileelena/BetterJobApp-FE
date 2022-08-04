import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {CustomValidators} from "../../custom-validators";
import {RoleEnum, User} from "../../models/user.model";
import {map} from "rxjs/operators";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  selectedFile: File;
  selectedFiles: FileList;
  passRegex: RegExp = /^(?=.*\d)(?=.*[!.@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  roles: RoleEnum[] = [RoleEnum.USER, RoleEnum.RECRUITER];
  edit: boolean = false;
  currentId: number;

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.initData();
  }

  get formControls() {
    return this.form.controls;
  }

  private initData() {
    let userEmail = sessionStorage.getItem('email')!.toString();

    this.userService.getUserByEmail(userEmail).subscribe(
      (user: User) => {
        this.currentId = user.id;
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

  onSubmit() {

  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }

  onCvAdded(): void {
    this.userService.uploadCv(this.selectedFile, this.currentId).subscribe(
      (message: string) => this.fileInput.nativeElement.value = '',
      () => this.fileInput.nativeElement.value = ''
    );
  }

}
