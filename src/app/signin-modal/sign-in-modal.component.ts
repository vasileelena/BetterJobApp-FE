import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../custom-validators";
import {HttpErrorResponse} from "@angular/common/http";
import {UserService} from "../user/user.service";
import {User} from "../user/user.model";

@Component({
  selector: 'app-sign-in-modal',
  templateUrl: './sign-in-modal.component.html',
  styleUrls: ['./sign-in-modal.component.css']
})
export class SignInModalComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  passRegex: RegExp = /^(?=.*\d)(?=.*[!.@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
  }

  ngOnInit(): void {
    this.initForm();
    this.form.valueChanges.subscribe();
  }

  private initForm() {
    this.form = this.formBuilder.group(
      {
        "firstName": ["", Validators.required],
        "lastName": ["", Validators.required],
        "email": [null, [Validators.required, Validators.email]],
        "password": [null, Validators.compose([Validators.required, Validators.pattern(this.passRegex)])],
        "confirmPass": [null, Validators.required],
        "birthDate": [null, [Validators.required]]
      },
      {
        validator: [CustomValidators.passwordMatchValidator, CustomValidators.birthDateValidator]
      }
    )
  }

  onSubmit() {
    console.log(this.form.value);
    this.userService.addUser(this.form.value).subscribe(
      (response: User) => {
        this.form.reset();
      },
      (error: HttpErrorResponse) => {
        alert('This email is already taken!');
        this.form.get('email')?.setErrors({unavailableEmail: true})
      }
    );

  }

  onCancel() {
    this.form.reset();
  }

  get formControls() {
    return this.form.controls;
  }

}
