import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { map } from 'rxjs/operators';
import {User} from "./user.model";
import {environment} from "../../environments/environment";

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
}
