import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Job} from "../../models/job.model";
import {JobService} from "../../services/job.service";
import {finalize, Observable, switchMap} from "rxjs";
import {User} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {NgbModal, NgbModalOptions, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {GenericModalComponent} from "../../generic-modal/generic-modal.component";
import {OpenCustomModalService} from "../../services/open-custom-modal.service";

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {

  isInitialised: boolean = false;
  job: Job;
  company: string;
  creationDate: string;
  applied: boolean;
  saved: boolean;
  currentUser: User;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private jobService: JobService,
              private userService: UserService,
              private modalService: NgbModal,
              private openCustomModalService: OpenCustomModalService) {
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
        this.applied = true;
        this.openCustomModalService.openModal(
          this.openCustomModalService.appliedJobModalTitle + this.job.jobTitle,
          this.openCustomModalService.appliedJobContentModal,
          false);
      });
  }

  saveJob() {
    this.userService.addJobToUser(this.currentUser.id, this.job.id, false)
      .subscribe((updatedJobs: Job[]) => {
        // emit that the saved jobs list has changed
        this.jobService.savedJobsChanged.next(updatedJobs);
        this.saved = true;
        this.openCustomModalService.openModal(
          this.openCustomModalService.savedJobModalTitle,
          this.openCustomModalService.savedJobContentModal,
          false);
      });
  }

  onDeleteJob(): void {
    // open modal to confirm the deletion
    const modalInstance: NgbModalRef = this.openCustomModalService.openModal(
      this.openCustomModalService.closeJobModalTitle + this.job.jobTitle,
      this.openCustomModalService.closeJobContentModal,
      true);
    modalInstance.result.then(() =>

      // handle of confirmation
      this.jobService.deleteJob(this.job.id, this.job.recruiterId)
        .subscribe((updatedJobs: Job[]) => {

          // emit that the jobs have been changed for the recruiter
          this.jobService.jobsChanged.next(updatedJobs);
          this.router.navigate(['recruiter/job']);
          // open modal with confirmation message
          this.openCustomModalService.openModal(this.openCustomModalService.confirmDeletionModalTitle,
            this.openCustomModalService.confirmDeletionModalContent, false);
        })
    );
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

}
