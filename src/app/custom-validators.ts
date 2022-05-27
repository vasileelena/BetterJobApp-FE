import {AbstractControl, Validators} from "@angular/forms";
import {RoleEnum} from "./models/user.model";

export class CustomValidators {

  static passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('password')?.value;
    const confirmPass: string = control.get('confirmPass')?.value;

    if (password !== confirmPass) {
      control.get('confirmPass')?.setErrors({noMatch: true});
    }
  }

  static birthDateValidator(control: AbstractControl) {
    const role = control.get('role')?.value;
    if(role === RoleEnum.USER ) {
      const birthDate = new Date(control.get('birthDate')?.value);
      let today = new Date();
      let checkAge = today.getFullYear() - birthDate.getFullYear();

      if (checkAge < 16) {
        control.get('birthDate')?.setErrors({underage: true});
      }
    }
  }

  static formValidator(control: AbstractControl) {
    const role = control.get('role')?.value;
    if(role === RoleEnum.USER ) {
      control.get('company')?.clearValidators();
      // control.get('company')?.reset(null);
      control.get('birthDate')?.addValidators(Validators.required);
    }
    else if(role === RoleEnum.RECRUITER ){
      control.get('birthDate')?.clearValidators();
      // control.get('birthDate')?.reset(null);
      control.get('company')?.addValidators(Validators.required);
    }
  }
}
