import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable, Subject} from "rxjs";
import {Job} from "../models/job.model";
import {User} from "../models/user.model";
import {FileHelperService} from "./file-helper.service";

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private readonly recruiterBaseUrl: string = environment.apiBaseUrl + '/recruiter/job';
  private readonly userBaseUrl: string = environment.apiBaseUrl + '/user';


  jobsChanged = new Subject<Job[]>();

  constructor(private http: HttpClient,
              private fileHelper: FileHelperService) { }

  public getJobById(jobId: number): Observable<Job> {
    return this.http.get<Job>(this.userBaseUrl + '/job/' + jobId.toString());
  }

  public getJobsByRecruiterId(recruiterId: number): Observable<Job[]> {
    return this.http.get<Job[]>(this.recruiterBaseUrl + '/recruiterId/' + recruiterId.toString());
  }

  public addJob(job: Job): Observable<Job> {
    return this.http.post<Job>(this.recruiterBaseUrl + '/add', job);
  }

  public getCandidatesForJob(jobId: number): Observable<User[]> {
    return this.http.get<User[]>(this.recruiterBaseUrl + '/jobId/' + jobId + '/applicants');
  }

  public getCandidateCv(userEmail: string): void {
    this.fileHelper.downloadFile(this.recruiterBaseUrl + '/applicants/cv/' + userEmail)
      .subscribe((blob: HttpResponse<Blob>) => this.fileHelper.saveFile(blob.body, "CV_" + userEmail + ".pdf")
        .subscribe());
  }
}
