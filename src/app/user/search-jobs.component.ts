import {Component, OnInit, ViewChild} from '@angular/core';
import {RoleEnum, User} from "../models/user.model";
import {UserService} from "../services/user.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {CurrencyEnum, ExperienceEnum, IndustryEnum, Job, LocationEnum, ProgramEnum} from "../models/job.model";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {JobFilterInputs} from "../models/job-filter-inputs.model";
import {finalize, switchMap} from "rxjs";

@Component({
  selector: 'app-user',
  templateUrl: './search-jobs.component.html',
  styleUrls: ['./search-jobs.component.css']
})
export class SearchJobsComponent implements OnInit {
  isInitialised: boolean = false;
  currentUserId: any;

  displayedJobs: Job [] = [];
  savedJobs: Job[] = [];
  appliedJobs: Job[] = [];

  industryArray: string[] = [];
  experienceArray: string[] = [];
  programArray: string[] = [];
  locationArray: string[] = [];

  filterForm: FormGroup = new FormGroup({});
  filterInputs!: JobFilterInputs;
  filterApplied = false;

  @ViewChild('locCheckbox') locationCheckbox: any;

  constructor(private userService: UserService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('role') === 'RECRUITER') {
      this.router.navigate(['recruiter/job']);
    }
    else {
      this.getAllJobs();
      this.initEnums();
      this.initForm();
    }
  }

  get formControls() {
    return this.filterForm.controls;
  }

  onCheckedIndustry(event: any, formArrayName: string) {
    const formArray = (this.formControls[formArrayName] as FormArray);
    if(event.target.checked) {
      formArray.push(new FormControl(event.target.value)); // add the new checked value
    }
    else {
      const index = formArray.controls
        .findIndex(x => x.value === event.target.value); // get the index of the unchecked value
      formArray.removeAt(index);
    }
  }

  onReset() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['user/search']);
    });
  }

  onSubmit() {
    this.filterInputs = {
      'industry': this.formControls['selectedIndustries'].value,
      'experience': this.formControls['selectedExperiences'].value,
      'undefinedPeriod': this.formControls['undefinedPeriod'].value,
      'period': this.formControls['period'].value,
      'program': this.formControls['selectedPrograms'].value,
      'salaryLowerRange': this.formControls['salaryLowerRange'].value,
      'salaryUpperRange': this.formControls['salaryUpperRange'].value,
      'currency': this.formControls['currency'].value,
      'location': this.formControls['selectedLocations'].value,
    };
    console.log(this.filterInputs)
    this.filterApplied = true;

  }

  isJobSaved(job : Job): boolean {
    return this.savedJobs.filter((j: Job) => j.id === job.id).length === 1;

  }

  isJobApplied(job : Job): boolean {
    return this.appliedJobs.filter((j: Job) => j.id === job.id).length === 1;
  }

  private getAllJobs() {
    let userEmail = sessionStorage.getItem('email')!.toString();

    this.userService.getUserByEmail(userEmail)
        .pipe(
            switchMap((user: User) => {
              this.currentUserId = user.id;
              return this.userService.getSavedJobs(this.currentUserId);
            }),
            switchMap((jobs: Job[]) => {
              this.savedJobs = jobs;
              return this.userService.getAppliedJobs(this.currentUserId);
            }),
            switchMap((jobs: Job[]) => {
              this.appliedJobs = jobs;
              return this.userService.getAllJobs();
            }))
        .pipe(finalize(() => this.isInitialised = true))
        .subscribe((jobs: Job[]) => this.displayedJobs = jobs);
  }

  private initForm() {
    this.filterForm = this.formBuilder.group(
      {
        "selectedIndustries": new FormArray([]),
        "selectedExperiences": new FormArray([]),
        "undefinedPeriod": [true],
        "period": [0, Validators.pattern(/^[0-9]*$/)],
        "selectedPrograms": new FormArray([]),
        "salaryLowerRange": [null, Validators.pattern(/^[0-9]*$/)],
        "salaryUpperRange": [null, Validators.pattern(/^[0-9]*$/)],
        "currency": [2],
        "selectedLocations": new FormArray([])
      }
    )
  }

  private initEnums() {
    this.industryArray = Object.keys(IndustryEnum).filter((key: any) => !isNaN(Number(IndustryEnum[key])));
    this.experienceArray = Object.keys(ExperienceEnum).filter((key: any) => !isNaN(Number(ExperienceEnum[key])));
    this.programArray = Object.keys(ProgramEnum).filter((key: any) => !isNaN(Number(ProgramEnum[key])));
    this.locationArray = Object.keys(LocationEnum).filter((key: any) => !isNaN(Number(LocationEnum[key])));
  }

}
