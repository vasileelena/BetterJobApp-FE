import {AbstractControl, Validators} from "@angular/forms";
import {RoleEnum} from "./models/user.model";

export class CustomValidators {

  static passwordMatchValidator(control: AbstractControl): void {
    const password: string = control.get('password')?.value;
    const confirmPass: string = control.get('confirmPass')?.value;

    if (password !== confirmPass) {
      control.get('confirmPass')?.setErrors({noMatch: true});
    }
  }

  static birthDateValidator(control: AbstractControl): void {
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
}
