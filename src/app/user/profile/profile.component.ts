import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {User} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {JobService} from "../../services/job.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  model: User;
  isInitialised: boolean = false;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private jobService: JobService) {
  }

  ngOnInit(): void {
    this.initUser();
  }

  downloadCv(): void {
    this.jobService.getCandidateCv(this.model.email);
  }

  private initUser(): void {
    const userEmail: string = this.route.snapshot.params['userEmail'];
    this.userService.getUserByEmail(userEmail).subscribe(
      (user: User) => {
        this.model = user;
        this.isInitialised = true;
      });
  }

}
