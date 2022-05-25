import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {UserComponent} from "./user/user.component";
import {SignInModalComponent} from "./signin-modal/sign-in-modal.component";
import {LogInModalComponent} from "./login-modal/log-in-modal.component";
import {AuthGuardService} from "./service/auth-guard.service";
import {RecruiterAuthGuardService} from "./service/recruiter-auth-guard.service";
import {RecruiterComponent} from "./recruiter/recruiter.component";
import {EditJobComponent} from "./job/edit-job/edit-job.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'user', component: UserComponent, canActivate:[AuthGuardService]},
  {path: 'signin', component: SignInModalComponent},
  {path: 'login', component: LogInModalComponent},
  {path: 'recruiter/job', component: RecruiterComponent,
    canActivate: [RecruiterAuthGuardService],
    canActivateChild: [RecruiterAuthGuardService],
    children: [
      {path: 'edit/new', component: EditJobComponent},
      {path: 'edit/:id', component: EditJobComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
