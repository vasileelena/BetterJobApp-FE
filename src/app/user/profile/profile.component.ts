import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {User} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {JobService} from "../../services/job.service";
import {finalize, of, switchMap} from "rxjs";
import {Job} from "../../models/job.model";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  model: User;
  jobList: Job[] = [];
  currentUserId: number;
  currentUserHasCv: boolean;
  isInitialised: boolean = false;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private jobService: JobService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.initUser();
  }

  downloadCv(): void {
    this.jobService.getCandidateCv(this.model.email);
  }

  public isCurrentUserRecruiter(): boolean {
    return this.authService.isUserRecruiter();
  }

  private initUser(): void {
    const userEmail: string = this.route.snapshot.params['userEmail'];
    this.userService.getUserByEmail(userEmail)
      .pipe(
        finalize(() => this.isInitialised = true),
        switchMap(
        (user: User) => {
          this.model = user;
          if(this.model.role.toString() !== 'USER') {
            return this.jobService.getJobsByRecruiterId(this.model.id);
          }
          else {
            return of();
          }
        }),
        switchMap((jobs: Job[]) => {
          this.jobList = jobs;
          let email: string = sessionStorage.getItem('email')!;
          return this.userService.getUserByEmail(email);
        }))
      .subscribe((user: User) => {
          this.currentUserHasCv = user.uploadedCV;
          this.currentUserId = user.id;
        }
        );
  }

}
