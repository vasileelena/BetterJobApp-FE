import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {UserComponent} from "./user/user.component";
import {SignInModalComponent} from "./home/signin-modal/sign-in-modal.component";
import {LogInModalComponent} from "./home/login-modal/log-in-modal.component";
import {AuthGuardService} from "./services/auth-guard.service";
import {RecruiterAuthGuardService} from "./services/recruiter-auth-guard.service";
import {RecruiterComponent} from "./user/recruiter/recruiter.component";
import {UserJobsComponent} from "./user/user-jobs/user-jobs.component";
import {EditUserComponent} from "./user/edit-user/edit-user.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'user', component: UserComponent, canActivate: [AuthGuardService]},
  {path: 'user/jobs', component: UserJobsComponent, canActivate: [AuthGuardService]},
  {path: 'user/profile', component: EditUserComponent, canActivate: [AuthGuardService]},
  {path: 'signin', component: SignInModalComponent},
  {path: 'login', component: LogInModalComponent},
  {path: 'recruiter/job', component: RecruiterComponent, canActivate: [RecruiterAuthGuardService]},
  {path: 'recruiter/job/new', component: RecruiterComponent, canActivate: [RecruiterAuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
