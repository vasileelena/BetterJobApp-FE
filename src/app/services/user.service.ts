import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { map } from 'rxjs/operators';
import {User} from "../models/user.model";
import {environment} from "../../environments/environment";
import {Job} from "../models/job.model";
import {UserJob} from "../models/user-job-model";

@Injectable({
  providedIn: 'root'
})
export class UserService{
  private url = environment.apiBaseUrl + '/user';

  constructor(private http: HttpClient) {}

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url + '/all');
  }

  public addUser(user: User): Observable<User> {
    return this.http.post<User>( environment.apiBaseUrl + '/signin', user);
  }

  public updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.url + '/update', user);
  }

  public deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(this.url + 'id' + id.toString());
  }

  public getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(this.url + '/email/' + email);
  }

  public getUserById(id: number): Observable<User> {
    return this.http.get<User>(this.url + '/id/' + id.toString());
  }

  public getAllJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.url + '/job/all');
  }

  public addJobToUser(userId: number, jobId: number, apply: boolean): Observable<UserJob> {
    console.log(userId, jobId, apply);
    return this.http.post<UserJob>(this.url + '/job/addJobToUser',
      {
        'userId': userId,
        'jobId': jobId,
        'apply': apply
      });
  }

  public getSavedJobs(userId: number): Observable<Job[]> {
    return this.http.get<Job[]>(this.url + '/jobs/saved/' + userId.toString());
  }

  public getAppliedJobs(userId: number): Observable<Job[]> {
    return this.http.get<Job[]>(this.url + '/jobs/applied/' + userId.toString());
  }

  public uploadCv(file: File, userEmail: string): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('file', file, 'CV_' + userEmail.toString());

    return this.http.post<string>(this.url + "/cv/" + userEmail.toString(), formData);
  }

}
