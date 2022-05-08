import {AbstractControl} from "@angular/forms";

export class CustomValidators {

  static passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('password')?.value;
    const confirmPass: string = control.get('confirmPass')?.value;

    if (password !== confirmPass) {
      control.get('confirmPass')?.setErrors({noMatch: true});
    }
  }

  static birthDateValidator(control: AbstractControl) {
    const birthDate = new Date(control.get('birthDate')?.value);
    let today = new Date();
    let checkAge = today.getFullYear() - birthDate.getFullYear();

    if (checkAge < 16) {
      control.get('birthDate')?.setErrors({underage: true});
    }
  }
}
