import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {Job} from "../models/job.model";
import {User} from "../models/user.model";
import {finalize} from "rxjs";
import {map} from "rxjs/operators";
import {NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {SignInModalComponent} from "./signin-modal/sign-in-modal.component";
import {LogInModalComponent} from "./login-modal/log-in-modal.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  recentJobs: any[] = [];
  isInitialised: boolean = false;

  constructor(private userService: UserService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.initRecentJobs();
  }

  openSigninModal() {
    const modalOptions: NgbModalOptions = {backdrop: 'static', size: 'md'}
    this.modalService.open(SignInModalComponent, modalOptions);

  }

  openLoginModal() {
    const modalOptions: NgbModalOptions = {backdrop: 'static', size: 'md'}
    this.modalService.open(LogInModalComponent, modalOptions);
  }

  private initRecentJobs(): void {
    this.userService.getAllJobs().pipe(
      map((jobs: Job[]) => {
        this.recentJobs =
          jobs
            .sort(
              (a: Job, b: Job) => Number(new Date(b.creationDate)) - Number(new Date(a.creationDate)))
            .splice(0, 4);

        for (let job of this.recentJobs) {
          this.userService.getUserById(job.recruiterId)
            .pipe(map((recruiter: User) => job.company = recruiter.company)).subscribe();
        }
      }),
      finalize(() => this.isInitialised = true)
    ).subscribe();
  }

}
