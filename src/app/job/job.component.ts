import {Component, Input, OnInit} from '@angular/core';
import {Job} from "../models/job.model";
import {UserService} from "../services/user.service";
import {JobService} from "../services/job.service";
import {User} from "../models/user.model";
import * as fa from '@fortawesome/free-solid-svg-icons'
import {IconDefinition} from "@fortawesome/free-brands-svg-icons";


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

  // FontAwesome icons declaration
  readonly iconLocation: IconDefinition = fa.faMapPin;
  readonly iconSalary: IconDefinition = fa.faEuroSign;
  readonly iconExperience: IconDefinition = fa.faAward;

  constructor(private userService: UserService,
              private jobService: JobService) { }

  ngOnInit(): void {
    this.getCandidatesNumber();
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
    this.jobService.getCandidatesForJob(this.model.id).subscribe(
      (users: User[]) => {
        this.numberOfCandidates = users.length;
        this.isInitialised = true;
      }
    );
  }

}
