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
  selectedFileForCv: File;
  selectedFileForProfilePic: File;
  passRegex: RegExp = /^(?=.*\d)(?=.*[!.@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  roles: RoleEnum[] = [RoleEnum.USER, RoleEnum.RECRUITER];
  model: User;
  profilePicSrc: string;
  isInitialised: boolean = false;
  cvWasUploaded: boolean = false;
  changesSaved: boolean = false;
  changesPending: boolean = false;

  @ViewChild('fileInputCv') fileInputCv: ElementRef;
  @ViewChild('fileInputProfilePic') fileInputProfilePic: ElementRef;

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
        this.profilePicSrc = '../../../assets/profile-pictures/IMG_' + this.model.email + '.jpeg';
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
    this.userService.updateUser(this.model).subscribe(
        () => {
          this.changesSaved = true;
          this.changesPending = false;
        }
    );
  }

  onEdit(): void {
    this.changesSaved = false;
    this.changesPending = true;
  }

  onFileSelectedForCv(event: any) {
    this.selectedFileForCv = <File>event.target.files[0];
    this.cvWasUploaded = false;
  }

  onFileSelectedForProfilePic(event: any) {
    this.selectedFileForProfilePic = <File>event.target.files[0];
  }

  onCvAdded(): void {
    this.userService.uploadCv(this.selectedFileForCv, this.model.email).pipe(
      finalize(() => this.fileInputCv.nativeElement.value = ''),
      switchMap(() => {
        this.model.uploadedCV = true;
        return this.userService.updateUser(this.model);
      })).subscribe(() => this.cvWasUploaded = true, (error) => {
        alert(error.message);
        this.cvWasUploaded = false;
    });
  }

  onProfilePictureAdded(): void {
    if (this.selectedFileForProfilePic.type === 'image/png' ||
      this.selectedFileForProfilePic.type === 'image/jpeg' ||
      this.selectedFileForProfilePic.type === 'image/jpg') {
      this.userService.uploadProfilePicture(this.selectedFileForProfilePic, this.model.email)
        .subscribe(
          () => {
            this.fileInputProfilePic.nativeElement.value = '';
            this.router.navigate(['user/profile/edit'])
              .then(() => {
                window.location.reload();
              });
          },
          (error) => {
            alert(error.message);
            this.fileInputProfilePic.nativeElement.value = '';
          });
    }
    else {
      alert("Wrong image format!");
      this.fileInputProfilePic.nativeElement.value = '';
    }
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
