import { Component, OnInit } from '@angular/core';
import {Job} from "../../models/job.model";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user.model";
import {finalize, switchMap} from "rxjs";

@Component({
  selector: 'app-user-jobs',
  templateUrl: './user-jobs.component.html',
  styleUrls: ['./user-jobs.component.css']
})
export class UserJobsComponent implements OnInit {

  savedJobs: Job[] = [];
  appliedJobs: Job[] = [];
  currentUserId: any;
  uploadedCv: boolean;
  isInitialised: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.initSavedAndAppliedJobs();
  }

  isJobSaved(job : Job): boolean {
    return this.savedJobs.filter((j: Job) => j.id === job.id).length === 1;

  }

  isJobApplied(job : Job): boolean {
    return this.appliedJobs.filter((j: Job) => j.id === job.id).length === 1;
  }

  /**
   * Initialize the saved and applied jobs
   */
  private initSavedAndAppliedJobs(): void {
    let userEmail = sessionStorage.getItem('email')!.toString();

    this.userService.getUserByEmail(userEmail)
      .pipe(
        switchMap((user: User) => {
          this.currentUserId = user.id;
          this.uploadedCv = user.uploadedCV;
          return this.userService.getSavedJobs(this.currentUserId);
        }),
        switchMap((jobs: Job[]) => {
          this.savedJobs = jobs;
          return this.userService.getAppliedJobs(this.currentUserId);
        }))
      .pipe(finalize(() => this.isInitialised = true))
      .subscribe((jobs: Job[]) => this.appliedJobs = jobs);
  }

}
