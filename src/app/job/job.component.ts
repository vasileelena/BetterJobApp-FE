import {Component, Input, OnInit} from '@angular/core';
import {Job} from "../models/job.model";
import {UserService} from "../services/user.service";
import {JobService} from "../services/job.service";
import {User} from "../models/user.model";
import * as fa from '@fortawesome/free-solid-svg-icons'
import {IconDefinition} from "@fortawesome/free-brands-svg-icons";
import {finalize, Observable, switchMap} from "rxjs";
import {map} from "rxjs/operators";


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
  numberOfCandidates: number;
  company: string;
  recommended: boolean;
  creationDate: string;

  // FontAwesome icons declaration
  readonly iconLocation: IconDefinition = fa.faMapPin;
  readonly iconSalary: IconDefinition = fa.faEuroSign;
  readonly iconExperience: IconDefinition = fa.faAward;

  readonly recommendationLabel: string = 'This job could fit your profile'

  constructor(private userService: UserService,
              private jobService: JobService) {
  }

  ngOnInit(): void {
    this.creationDate = new Date(this.model.creationDate).toLocaleDateString();
    this.getCandidatesNumber();
    if(!this.recruiter) {
      this.isJobRecommendedForUser();
    }
  }

  //TODO handle change of applied and saved states in the screen
  applyToJob() {
    this.userService.addJobToUser(this.userId, this.model.id, true).subscribe();
  }

  saveJob() {
    this.userService.addJobToUser(this.userId, this.model.id, false).subscribe();
  }

  /**
   * Get the candidates number for this job
   */
  getCandidatesNumber(): void {
    this.jobService.getCandidatesForJob(this.model.id)
      .pipe(
        finalize(() => this.isInitialised = true),
        switchMap(
          (users: User[]) => {
            this.numberOfCandidates = users.length;
            return this.initCompany();
          }))
      .subscribe((recruiter: User) => this.company = recruiter.company);
  }

  /**
   * Initialize the company that hosts the job
   */
  initCompany(): Observable<User> {
    return this.userService.getUserById(this.model.recruiterId);
  }

  /**
   * Check if the job is fitted for a user's profile by the user's skills
   * and the job's description and requirements
   */
  isJobRecommendedForUser() {
    this.isInitialised = false;
    this.userService.getUserById(this.userId).subscribe(
      (user: User) => {
        const skillsArray = user.skills.split(',');

        this.recommended = (skillsArray.some(skill => {
          return this.model.description.toLowerCase().includes(skill.toLowerCase()) ||
            this.model.requirements.toLowerCase().includes(skill.toLowerCase());
        }));

        this.isInitialised = true;
      });
  }

}
