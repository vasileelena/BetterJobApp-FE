import {Component, Input, OnInit} from '@angular/core';
import {Job} from "../models/job.model";
import {UserService} from "../services/user.service";
import {JobService} from "../services/job.service";
import {User} from "../models/user.model";
import * as fa from '@fortawesome/free-solid-svg-icons'
import {IconDefinition} from "@fortawesome/free-brands-svg-icons";
import {finalize, Observable, switchMap} from "rxjs";
import {map} from "rxjs/operators";
import {NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {NewJobModalComponent} from "./new-job/new-job-modal.component";
import {GenericModalComponent} from "../generic-modal/generic-modal.component";


@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {

  readonly savedJobModalTitle: string = 'Job was saved to your profile';
  readonly appliedJobModalTitle: string = 'You have applied to the job position ';
  readonly savedJobContentModal: string = 'You have successfully saved this job position.\n' +
    'You can see the job later on \'My jobs\' section.';
  readonly appliedJobContentModal: string = 'You have successfully applied to this job position.\n' +
    'If the recruiter decides that you are a fitted candidate, they will contact you. Good luck!\n' +
    'You can see the all applied jobs later on \'My jobs\' section.';

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
              private jobService: JobService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.creationDate = new Date(this.model.creationDate).toLocaleDateString();
    this.getCandidatesNumber();
    if (!this.recruiter) {
      this.isJobRecommendedForUser();
    }
  }

  applyToJob() {
    this.userService.addJobToUser(this.userId, this.model.id, true)
      .subscribe((appliedJobs: Job[]) => {
        // emit that the jobs list has changed
        this.jobService.appliedJobsChanged.next(appliedJobs);
        this.openConfirmationModal(this.appliedJobModalTitle + this.model.jobTitle, this.appliedJobContentModal);
      });
  }

  saveJob() {
    this.userService.addJobToUser(this.userId, this.model.id, false)
      .subscribe((savedJobs: Job[]) => {
        // emit that the jobs list has changed
        this.jobService.savedJobsChanged.next(savedJobs);
        this.openConfirmationModal(this.savedJobModalTitle, this.savedJobContentModal);
      });
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

  private openConfirmationModal(title: string, content: string) {
    const modalOptions: NgbModalOptions = {backdrop: 'static', size: 'md'};
    const modalInstance = this.modalService.open(GenericModalComponent, modalOptions);
    modalInstance.componentInstance.title = title;
    modalInstance.componentInstance.content = content;
    modalInstance.componentInstance.hasConfirmButton = false;
  }

}
