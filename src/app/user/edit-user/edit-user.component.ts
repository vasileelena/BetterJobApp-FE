import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {CustomValidators} from "../../custom-validators";
import {RoleEnum, User} from "../../models/user.model";
import {map} from "rxjs/operators";
import {finalize, switchMap} from "rxjs";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  selectedFile: File;
  selectedFiles: FileList;
  passRegex: RegExp = /^(?=.*\d)(?=.*[!.@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  roles: RoleEnum[] = [RoleEnum.USER, RoleEnum.RECRUITER];
  model: User;
  isInitialised: boolean = false;

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.initData();
  }

  get formControls() {
    return this.form.controls;
  }

  private initData(): void {
    const currentUserEmail = sessionStorage.getItem('email')!.toString();

    this.userService.getUserByEmail(currentUserEmail)
      .pipe(finalize(() => this.isInitialised = true))
      .subscribe(
      (user: User) => {
        this.model = user;
        this.initForm();
      });
  }


  onAddSkill(): void {
    this.skills.push(this.formBuilder.control(''));
  }

  initSkill(skill: string): void {
    this.skills.push(this.formBuilder.control(skill));
  }

  onDeleteSkill(index: number): void {
    (<FormArray>this.form.get('skills')).removeAt(index);
  }

  get skills(): FormArray {
    return this.form.get('skills') as FormArray;
  }

  onSubmit(): void {
    this.model.skills = this.skills.value.join();
    this.userService.updateUser(this.model).subscribe();
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }

  onCvAdded(): void {
    this.userService.uploadCv(this.selectedFile, this.model.email).subscribe(
      (message: string) => this.fileInput.nativeElement.value = '',
      () => this.fileInput.nativeElement.value = ''
    );
  }

  private initForm(): void {
    this.form = this.formBuilder.group(
      {
        "firstName": [this.model.firstName, Validators.required],
        "lastName": [this.model.lastName, Validators.required],
        "description": [this.model.description],
        "company": [this.model.company ],
        "location": [this.model.location ],
        "skills": this.formBuilder.array([])
      });

    if(this.model.skills.length !== null) {
      let skillsArray: string[] = this.model.skills.split(',');
      for(let skill of skillsArray){
        this.initSkill(skill);
      }
    }

    if(this.model.role.toString() === 'USER') {
      this.formControls['location'].addValidators(Validators.required);
    }
    else {
      this.formControls['company'].addValidators(Validators.required);
    }
  }

}
