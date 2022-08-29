import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../../custom-validators";
import {HttpErrorResponse} from "@angular/common/http";
import {UserService} from "../../services/user.service";
import {RoleEnum, User} from "../../models/user.model";
import {Router} from "@angular/router";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-sign-in-modal',
  templateUrl: './sign-in-modal.component.html',
  styleUrls: ['./sign-in-modal.component.css']
})
export class SignInModalComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  passRegex: RegExp = /^(?=.*\d)(?=.*[!.@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  roles: RoleEnum[] = [RoleEnum.USER, RoleEnum.RECRUITER];

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router,
              private modalService: NgbActiveModal) {
  }

  ngOnInit(): void {
    this.initForm();
    this.form.valueChanges.subscribe();
  }

  onSubmit() {
    this.userService.addUser(this.form.value).subscribe(
      () => {
        this.form.reset();
        this.onCancel();
      },
      (error: HttpErrorResponse) => {
        alert('This email is already taken!');
        this.form.get('email')?.setErrors({unavailableEmail: true})
      }
    );

  }

  onCancel() {
    this.form.reset();
    this.router.navigate(['/']).then(
      () => this.modalService.dismiss()
    );
  }

  get formControls() {
    return this.form.controls;
  }

  /**
   * Updated the controls validators depending on the type of user
   */
  public updateValidationForUserType(): void {
    if(this.formControls['role'].value === RoleEnum.USER) {
      this.formControls['birthDate'].clearValidators();
      this.formControls['birthDate'].setValue(null);

      this.formControls['company'].addValidators(Validators.required);
      this.formControls['company'].updateValueAndValidity({onlySelf: true});
    }
    else {
      this.formControls['company'].clearValidators();
      this.formControls['company'].setValue(null);

      this.formControls['birthDate'].addValidators(Validators.required);
      this.formControls['birthDate'].updateValueAndValidity({onlySelf: true});
    }
  }


  private initForm() {
    this.form = this.formBuilder.group(
      {
        "firstName": ["", Validators.required],
        "lastName": ["", Validators.required],
        "email": [null, [Validators.required, Validators.email]],
        "password": [null, Validators.compose([Validators.required, Validators.pattern(this.passRegex)])],
        "confirmPass": [null, Validators.required],
        "role": [null, Validators.required],
        "company": [null],
        "birthDate": [null]},
      {
        validator: [CustomValidators.passwordMatchValidator, CustomValidators.birthDateValidator]
      });
  }
}
