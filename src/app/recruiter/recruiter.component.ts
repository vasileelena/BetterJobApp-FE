import {Component, OnDestroy, OnInit} from '@angular/core';
import {Job} from "../job/job.model";
import {JobService} from "../service/job.service";
import {UserService} from "../service/user.service";
import {User} from "../user/user.model";
import {noop, Subject, Subscription, switchMap} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {SignInModalComponent} from "../signin-modal/sign-in-modal.component";
import {NewJobModalComponent} from "../job/new-job/new-job-modal.component";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-recruiter',
  templateUrl: './recruiter.component.html',
  styleUrls: ['./recruiter.component.css']
})
export class RecruiterComponent implements OnInit {

  currentUserId: any;
  jobList: Job[] = [];

  jobsChangedSubscription!: Subscription;

  constructor(private jobService: JobService,
              private userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private modalService: NgbModal) {}

  ngOnInit(): void {
    this.getJobs();
    this.jobsChangedSubscription = this.jobService.jobsChanged.subscribe(
      (jobs: Job[]) => this.jobList = jobs
    );

    // this.userService.getUserByEmail(userEmail).pipe(
    //   map(
    //   (user: User) => {
    //     this.currentUserId = user.id;
    //     return this.jobService.getJobsByUserId(this.currentUserId).pipe(
    //       map(
    //         (jobs: Job[]) => this.jobList = jobs
    //         )).subscribe();
    //     }
    //   )).subscribe();


  }

  onAddJob() {
    const modalOptions: NgbModalOptions = {backdrop: 'static', size: 'md'};
    const modalInstance = this.modalService.open(NewJobModalComponent, modalOptions);
    modalInstance.componentInstance.userId = this.currentUserId;

  }

  getJobs() {
    let userEmail = sessionStorage.getItem('email')!.toString();

    this.userService.getUserByEmail(userEmail).subscribe(
      (user: User) => {
        this.currentUserId = user.id;
        this.jobService.getJobsByUserId(this.currentUserId).subscribe(
          (jobs: Job[]) => this.jobList = jobs
        )
      }
    );
  }

}
