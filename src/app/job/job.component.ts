import {Component, Input, OnInit} from '@angular/core';
import {Job} from "../models/job.model";
import {UserService} from "../services/user.service";
import {JobService} from "../services/job.service";
import {User} from "../models/user.model";
import * as fa from '@fortawesome/free-solid-svg-icons'
import {IconDefinition} from "@fortawesome/free-brands-svg-icons";
import {finalize, Observable, switchMap} from "rxjs";
import {map} from "rxjs/operators";
import {NgbModal, NgbModalOptions, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {NewJobModalComponent} from "./new-job/new-job-modal.component";
import {GenericModalComponent} from "../generic-modal/generic-modal.component";
import {Router} from "@angular/router";
import {OpenCustomModalService} from "../services/open-custom-modal.service";


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
  @Input() userHasCv: boolean;

  isInitialised: boolean = false;
  numberOfCandidates: number;
  company: string;
  recommended: boolean;
  creationDate: string;

  // FontAwesome icons declaration
  readonly iconLocation: IconDefinition = fa.faMapPin;
  readonly iconSalary: IconDefinition = fa.faEuroSign;
  readonly iconExperience: IconDefinition = fa.faAward;

  readonly recommendationLabel: string = 'Fits your profile!'

  constructor(private userService: UserService,
              private jobService: JobService,
              private openCustomModalService: OpenCustomModalService) {
  }

  ngOnInit(): void {
    this.creationDate = new Date(this.model.creationDate).toLocaleDateString();
    this.getCandidatesNumber();
    if (!this.recruiter) {
      this.isJobRecommendedForUser();
    }
  }

  onDeleteJob(): void {
    // open modal to confirm the deletion
    const modalInstance: NgbModalRef = this.openCustomModalService.openModal(
      this.openCustomModalService.closeJobModalTitle + this.model.jobTitle,
      this.openCustomModalService.closeJobContentModal,
      true);
    modalInstance.result.then(() =>

      // handle of confirmation
      this.jobService.deleteJob(this.model.id, this.model.recruiterId)
        .subscribe((updatedJobs: Job[]) => {

          // emit that the jobs have been changed for the recruiter
          this.jobService.jobsChanged.next(updatedJobs);

          // open modal with confirmation message
          this.openCustomModalService.openModal(this.openCustomModalService.confirmDeletionModalTitle,
            this.openCustomModalService.confirmDeletionModalContent, false);
        })
    );
  }

  applyToJob() {
    this.userService.addJobToUser(this.userId, this.model.id, true)
      .subscribe((appliedJobs: Job[]) => {
        // emit that the jobs list has changed
        this.jobService.appliedJobsChanged.next(appliedJobs);
        this.openCustomModalService.openModal(
          this.openCustomModalService.appliedJobModalTitle + this.model.jobTitle,
          this.openCustomModalService.appliedJobContentModal,
          false);
      });
  }

  saveJob() {
    this.userService.addJobToUser(this.userId, this.model.id, false)
      .subscribe((savedJobs: Job[]) => {
        // emit that the jobs list has changed
        this.jobService.savedJobsChanged.next(savedJobs);
        this.openCustomModalService.openModal(
          this.openCustomModalService.savedJobModalTitle,
          this.openCustomModalService.savedJobContentModal,
          false);
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

}
