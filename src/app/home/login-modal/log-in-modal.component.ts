import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {RoleEnum, User} from "../../models/user.model";
import {AuthService} from "../../services/auth.service";
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
    this.authService.login(this.form.value)
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
          if(user.role.toString() === 'USER') {
            this.router.navigate(['user/search/keywords'])
              .then(() => this.modalService.close());
          }
          else {
            this.router.navigate(['recruiter/job'])
              .then(() => this.modalService.close());
          }
        }
      }, (error: any) => {
        alert('The user doesn\'t exist or the credentials are wrong!');
      })
    this.form.reset();
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
}
