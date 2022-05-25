import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Job} from "../job/job/job.model";

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private url = environment.apiBaseUrl + '/recruiter/job';

  constructor(private http: HttpClient) { }

  public getJobsByUserId(userId: number): Observable<Job[]> {
    return this.http.get<Job[]>(this.url + '/userId/' + userId.toString());
  }
}
