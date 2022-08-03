import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable, Subject} from "rxjs";
import {Job} from "../models/job.model";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private readonly url: string = environment.apiBaseUrl + '/recruiter/job';

  jobsChanged = new Subject<Job[]>();

  constructor(private http: HttpClient) { }

  public getJobsByRecruiterId(recruiterId: number): Observable<Job[]> {
    return this.http.get<Job[]>(this.url + '/recruiterId/' + recruiterId.toString());
  }

  public addJob(job: Job): Observable<Job> {
    return this.http.post<Job>(this.url + '/add', job);
  }

  public getApplicantsForJob(jobId: number): Observable<User[]> {
    return this.http.get<User[]>(this.url + '/jobId/' + jobId + '/applicants');
  }
}
