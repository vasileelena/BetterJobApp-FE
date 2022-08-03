import {Component, Input, OnInit} from '@angular/core';
import {Job} from "../models/job.model";
import {UserJob} from "../models/user-job-model";
import {UserService} from "../services/user.service";
import {JobService} from "../services/job.service";
import {User} from "../models/user.model";

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {

  @Input() model: Job;
  @Input() recruiter: boolean;
  @Input() userId: number;
  @Input() saved: boolean;
  @Input() applied: boolean;

  isInitialised: boolean = false;
  applicants: User[] = [];

  constructor(private userService: UserService,
              private jobService: JobService) { }

  ngOnInit(): void {
    this.getApplicants();
  }

  //TODO handle change of applied and saved states in the screen
  applyToJob() {
    this.userService.addJobToUser(this.userId, this.model.id, true).subscribe();
  }

  saveJob() {
    this.userService.addJobToUser(this.userId, this.model.id, false).subscribe();
  }

  /**
   * Get the applicants for this job
   */
  getApplicants(): void {
    this.jobService.getApplicantsForJob(this.model.id).subscribe(
      (users: User[]) => {
        this.applicants = users;
        this.isInitialised = true;
      }
    );
  }

}
