import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable, Subject} from "rxjs";
import {Job} from "../job/job.model";

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private url = environment.apiBaseUrl + '/recruiter/job';
  jobsChanged = new Subject<Job[]>();

  constructor(private http: HttpClient) { }

  public getJobsByUserId(userId: number): Observable<Job[]> {
    return this.http.get<Job[]>(this.url + '/userId/' + userId.toString());
  }

  public getJobById(id: number): Observable<Job> {
    return this.http.get<Job>(this.url + id.toString());
  }

  public addJob(job: Job): Observable<Job> {
    return this.http.post<Job>(this.url + '/add', job);
  }
}
