import {Component, Input, OnInit} from '@angular/core';
import {Job} from "../models/job.model";
import {UserJob} from "../models/user-job-model";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {

  // @ts-ignore
  @Input() model: Job;
  // @ts-ignore
  @Input() recruiter: boolean;
  // @ts-ignore
  @Input() userId: number;
  // @ts-ignore
  @Input() saved: boolean;
  // @ts-ignore
  @Input() applied: boolean;

  constructor(private userService: UserService) { }

  ngOnInit(): void {

  }

  applyToJob() {
    this.userService.addJobToUser(this.userId, this.model.id, true).subscribe();
  }

  saveJob() {
    this.userService.addJobToUser(this.userId, this.model.id, false).subscribe();
  }

}
