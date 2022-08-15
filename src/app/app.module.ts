import {NgModule} from '@angular/core';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SearchJobsComponent} from './user/search-jobs.component';
import {HttpClientModule} from "@angular/common/http";
import {HeaderComponent} from './header/header.component';
import {SignInModalComponent} from './home/signin-modal/sign-in-modal.component';
import {LogInModalComponent} from './home/login-modal/log-in-modal.component';
import {ReactiveFormsModule} from "@angular/forms";
import { HomeComponent } from './home/home.component';
import { RecruiterComponent } from './user/recruiter/recruiter.component';
import { JobComponent } from './job/job.component';
import { NewJobModalComponent } from './job/new-job/new-job-modal.component';
import { FilterJobsPipe } from './pipes/filter-jobs.pipe';
import { UserJobsComponent } from './user/user-jobs/user-jobs.component';
import { EditUserComponent } from './user/user-details/edit-user.component';
import { JobDetailsComponent } from './job/job-details/job-details.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ApplicantsComponent } from './user/recruiter/applicants/applicants.component';
import { ProfileComponent } from './user/profile/profile.component';
import { GenericModalComponent } from './generic-modal/generic-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchJobsComponent,
    HeaderComponent,
    SignInModalComponent,
    LogInModalComponent,
    HomeComponent,
    RecruiterComponent,
    JobComponent,
    NewJobModalComponent,
    FilterJobsPipe,
    UserJobsComponent,
    EditUserComponent,
    JobDetailsComponent,
    ApplicantsComponent,
    ProfileComponent,
    GenericModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule {
}
