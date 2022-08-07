import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {SearchJobsComponent} from "./user/search-jobs.component";
import {SignInModalComponent} from "./home/signin-modal/sign-in-modal.component";
import {LogInModalComponent} from "./home/login-modal/log-in-modal.component";
import {AuthGuardService} from "./services/auth-guard.service";
import {RecruiterAuthGuardService} from "./services/recruiter-auth-guard.service";
import {RecruiterComponent} from "./user/recruiter/recruiter.component";
import {UserJobsComponent} from "./user/user-jobs/user-jobs.component";
import {UserDetailsComponent} from "./user/user-details/user-details.component";
import {JobDetailsComponent} from "./job/job-details/job-details.component";
import {ApplicantsComponent} from "./user/recruiter/applicants/applicants.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'user/search', component: SearchJobsComponent, canActivate: [AuthGuardService]},
  {path: 'user/search/job-details/:jobId', component: JobDetailsComponent, canActivate: [AuthGuardService]},
  {path: 'user/jobs', component: UserJobsComponent, canActivate: [AuthGuardService]},
  {path: 'user/profile', component: UserDetailsComponent, canActivate: [AuthGuardService]},
  {path: 'signin', component: SignInModalComponent},
  {path: 'login', component: LogInModalComponent},
  {path: 'recruiter/job', component: RecruiterComponent, canActivate: [RecruiterAuthGuardService]},
  {path: 'recruiter/job/applicants/:jobId', component: ApplicantsComponent, canActivate: [RecruiterAuthGuardService]},
  {path: 'recruiter/job/new', component: RecruiterComponent, canActivate: [RecruiterAuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
