import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Job} from "../../models/job.model";
import {JobService} from "../../services/job.service";

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {

  jobId: number;
  job: Job;
  isInitialised: boolean = false;

  constructor(private route: ActivatedRoute, private jobService: JobService) { }

  ngOnInit(): void {
    this.jobId = +this.route.snapshot.params['jobId'];
    this.jobService.getJobById(this.jobId).subscribe(
      (jobResponse: Job) => {
        this.job = jobResponse;
        this.isInitialised = true;
      }
    )
  }

}
