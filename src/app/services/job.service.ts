import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable, Subject} from "rxjs";
import {Job} from "../models/job.model";

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private url = environment.apiBaseUrl + '/recruiter/job';
  jobsChanged = new Subject<Job[]>();

  constructor(private http: HttpClient) { }

  public getJobsByRecruiterId(recruiterId: number): Observable<Job[]> {
    return this.http.get<Job[]>(this.url + '/recruiterId/' + recruiterId.toString());
  }

  public addJob(job: Job): Observable<Job> {
    return this.http.post<Job>(this.url + '/add', job);
  }
}
