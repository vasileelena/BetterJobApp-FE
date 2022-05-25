import { Component, OnInit } from '@angular/core';
import {Job} from "../job/job/job.model";
import {JobService} from "../service/job.service";
import {UserService} from "../service/user.service";
import {User} from "../user/user.model";
import {switchMap} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-recruiter',
  templateUrl: './recruiter.component.html',
  styleUrls: ['./recruiter.component.css']
})
export class RecruiterComponent implements OnInit {

  currentUserId: any;
  jobList: Job[] = [];

  constructor(private jobService: JobService,
              private userService: UserService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    if(sessionStorage.getItem('email') !== null) {
      let userEmail = sessionStorage.getItem('email')!.toString();
      this.userService.getUserByEmail(userEmail).pipe(
        switchMap(
        (user: User) => {
          this.currentUserId = user.id;
          return this.jobService.getJobsByUserId(this.currentUserId).pipe(
            switchMap(
              (jobs: Job[]) => this.jobList = jobs
              )
            );
          }
        )
      ).subscribe();
    }
  }

  onAddJob() {
    this.router.navigate(['edit/new'], {relativeTo: this.route});
  }

}
