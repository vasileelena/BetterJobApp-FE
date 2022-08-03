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
  currentFile: File;
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

  selectFile(event: any) {
    this.selectedFiles = event.target.files;
  }

  onSubmit() {

  }

  onCvAdded(): void {
    // this.currentFile = this.selectedFiles.item(0)! ;
    // let userEmail = sessionStorage.getItem('email')!.toString();
    //
    // this.userService.getUserByEmail(userEmail)
    //   .pipe(
    //     switchMap(
    //     (user: User) => {
    //       let id = user.id;
    //       return this.userService.uploadCv(this.currentFile, id);
    //       })
    //   )
    //   .subscribe(
    //       () => console.log("success")
    //     );

    // check if a file has been selected
    if(this.fileInput?.nativeElement?.files?.length > 0) {
      this.userService.uploadCv(this.fileInput.nativeElement.files[0], this.currentId);
    }
  }

}
