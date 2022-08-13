import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CurrencyEnum, ExperienceEnum, IndustryEnum, Job, LocationEnum, ProgramEnum} from "../../models/job.model";
import {JobService} from "../../services/job.service";
import {CustomValidators} from "../../custom-validators";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Subject} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-add-job',
  templateUrl: './new-job-modal.component.html',
  styleUrls: ['./new-job-modal.component.css']
})
export class NewJobModalComponent implements OnInit {

  readonly descriptionPlaceholder: string = 'A brief description of the job position';
  readonly requirementsPlaceholder: string = 'Describe the ideal candidate';
  readonly responsibilitiesPlaceholder: string = 'Present some of the responsibilities for this job position';
  readonly benefitsPlaceholder: string = 'Enumerate some of the benefits offered by your company';

  form: FormGroup = new FormGroup({});
  industryArray: string[] = [];
  experienceArray: string[] = [];
  programArray: string[] = [];
  locationArray: string[] = [];

  @Input()
  private recruiterId: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private  jobService: JobService,
              private modalService: NgbActiveModal) {  }

  ngOnInit(): void {
    this.initForm();
    this.initEnums();
  }

  /**
   * Submit the form and close the modal
   */
  onSubmit() : void{
    this.jobService.addJob({
      recruiterId: this.recruiterId,
      ...this.form.value,
      creationDate: new Date(Date.now())
    }).subscribe(() => this.closeModal());
  }

  /**
   * Action to perform when closing the modal
   */
  closeModal(): void {
    this.router.navigate(['recruiter/job']).then(
      () => {
        this.modalService.dismiss();
        // emit that the jobs list has changed
        this.jobService.getJobsByRecruiterId(this.recruiterId).pipe(
          map((jobs: Job[]) => {
              this.jobService.jobsChanged.next(jobs);
            }
          )).subscribe()
      }
    );
  }

  /**
   * Initialize the form
   */
  private initForm(): void {
    this.form = this.formBuilder.group(
      {
        "jobTitle": ["", Validators.required],
        "industry": ["", Validators.required],
        "experience": [null, [Validators.required]],
        "undefinedPeriod": [true, Validators.required],
        "period": [0, Validators.required],
        "program": [null, Validators.required],
        "salaryLowerRange": [null, Validators.required],
        "salaryUpperRange": [null, Validators.required],
        "currency": [CurrencyEnum.RON, Validators.required],
        "location": [null, Validators.required],
        "description": [null, Validators.required],
        "requirements": [null, Validators.required],
        "responsibilities": [null, Validators.required],
        "benefits": [null, Validators.required],
      }
    );
  }

  /**
   * Initialize the enums used for the form
   */
  private initEnums(): void {
    this.industryArray = Object.keys(IndustryEnum).filter((key: any) => !isNaN(Number(IndustryEnum[key])));
    this.experienceArray = Object.keys(ExperienceEnum).filter((key: any) => !isNaN(Number(ExperienceEnum[key])));
    this.programArray = Object.keys(ProgramEnum).filter((key: any) => !isNaN(Number(ProgramEnum[key])));
    this.locationArray = Object.keys(LocationEnum).filter((key: any) => !isNaN(Number(LocationEnum[key])));
  }

  get formControls() {
    return this.form.controls;
  }
}
