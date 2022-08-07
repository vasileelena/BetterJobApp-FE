import { Component, OnInit } from '@angular/core';
import {User} from "../../../models/user.model";
import {JobService} from "../../../services/job.service";
import {ActivatedRoute} from "@angular/router";
import {FileHelperService} from "../../../services/file-helper.service";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.css']
})
export class ApplicantsComponent implements OnInit {

  currentJobId: number;
  candidates: User[] = [];
  isInitialised: boolean = false;

  constructor(private jobService: JobService,
              private route: ActivatedRoute,
              private fileHelper: FileHelperService) { }

  ngOnInit(): void {
    this.initCandidates();
  }

  /**
   * Get the candidates for this job
   */
  initCandidates(): void {
    this.currentJobId = +this.route.snapshot.params['jobId'];
    this.jobService.getCandidatesForJob(this.currentJobId).subscribe(
      (users: User[]) => {
        this.candidates = users;
        this.isInitialised = true;
      }
    );
  }

  downloadCvForCandidate(userEmail: string) {
    this.jobService.getCandidateCv(userEmail);
  }

}
