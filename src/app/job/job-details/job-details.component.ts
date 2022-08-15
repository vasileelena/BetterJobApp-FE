import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Job} from "../../models/job.model";
import {JobService} from "../../services/job.service";
import {finalize, Observable, switchMap} from "rxjs";
import {User} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {GenericModalComponent} from "../../generic-modal/generic-modal.component";

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {

  readonly savedJobModalTitle: string = 'Job was saved to your profile';
  readonly appliedJobModalTitle: string = 'You have applied to the job position ';
  readonly savedJobContentModal: string = 'You have successfully saved this job position.\n' +
    'You can see the job later on \'My jobs\' section.';
  readonly appliedJobContentModal: string = 'You have successfully applied to this job position.\n' +
    'If the recruiter decides that you are a fitted candidate, they will contact you. Good luck!\n' +
    'You can see the all applied jobs later on \'My jobs\' section.';

  isInitialised: boolean = false;
  job: Job;
  company: string;
  creationDate: string;
  applied: boolean;
  saved: boolean;
  currentUser: User;

  constructor(private route: ActivatedRoute,
              private jobService: JobService,
              private userService: UserService,
              private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.initJob();
    this.initCurrentUser();
  }


  applyToJob() {
    this.userService.addJobToUser(this.currentUser.id, this.job.id, true)
      .subscribe((updatedJobs: Job[]) => {
        // emit that the applied jobs list has changed
        this.jobService.appliedJobsChanged.next(updatedJobs);
        this.applied = false;
        this.openConfirmationModal(this.appliedJobModalTitle + this.job.jobTitle, this.appliedJobContentModal);
      });
  }

  saveJob() {
    this.userService.addJobToUser(this.currentUser.id, this.job.id, false)
      .subscribe((updatedJobs: Job[]) => {
        // emit that the saved jobs list has changed
        this.jobService.savedJobsChanged.next(updatedJobs);
        this.saved = false;
        this.openConfirmationModal(this.savedJobModalTitle, this.savedJobContentModal);
      });
  }

  /**
   * Initialize the current job
   */
  private initJob(): void {
    const jobId = +this.route.snapshot.params['jobId'];
    this.jobService.getJobById(jobId)
      .pipe(
        switchMap((jobResponse: Job) => {
          this.job = jobResponse;
          this.creationDate = new Date(this.job.creationDate).toLocaleDateString();
          return this.userService.getUserById(this.job.recruiterId);
        }))
      .subscribe(
        (recruiter: User) => this.company = recruiter.company
      );

  }

  /**
   * Initialize the current user and check if the user applied to the job or saved the job
   */
  private initCurrentUser(): void {
    const email: string = sessionStorage.getItem('email')!.toString();

    this.userService.getUserByEmail(email)
      .pipe(
        finalize(() => this.isInitialised = true),
        switchMap(
          (user: User) => {
            this.currentUser = user;
            return this.userService.hasUserAppliedToJob(this.currentUser.id, this.job.id);
          }),
        switchMap(
          (applied: boolean) => {
            this.applied = applied;
            return this.userService.hasUserSavedJob(this.currentUser.id, this.job.id);
          }))
      .subscribe((saved: boolean) => this.saved = saved);
  }

  private openConfirmationModal(title: string, content: string) {

    const modalOptions: NgbModalOptions = {backdrop: 'static', size: 'md'};
    const modalInstance = this.modalService.open(GenericModalComponent, modalOptions);
    modalInstance.componentInstance.title = title;
    modalInstance.componentInstance.content = content;
    modalInstance.componentInstance.hasConfirmButton = false;

  }

}
