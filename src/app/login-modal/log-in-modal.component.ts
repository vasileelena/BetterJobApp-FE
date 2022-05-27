import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {map} from "rxjs"
import {User} from "../models/user.model";
import {AuthService} from "../services/auth.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-log-in-modal',
  templateUrl: './log-in-modal.component.html',
  styleUrls: ['./log-in-modal.component.css']
})
export class LogInModalComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private modalService: NgbActiveModal) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.form = this.formBuilder.group({
      "email": [null, Validators.required],
      "password": [null, Validators.required]
    })
  }

  onSubmit() {
    console.log(this.form.value);

    let result = this.authService.login(this.form.value)
      .subscribe(
        (user: User) => {
        if(user) {
          sessionStorage.setItem(
            'email',
            user.email
          );
          sessionStorage.setItem(
            'role',
            user.role.toString()
          );
          this.onCancel();
        }
      }, error => {
        alert(error.message());
      })
    this.form.reset();
  }

  onCancel() {
    this.form.reset();
    this.router.navigate(['/user']).then(
      () => this.modalService.dismiss()
    );

  }

  get formControls() {
    return this.form.controls;
  }
}
