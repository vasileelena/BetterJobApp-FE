import {NgModule} from '@angular/core';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UserComponent} from './user/user.component';
import {HttpClientModule} from "@angular/common/http";
import {HeaderComponent} from './header/header.component';
import {SignInModalComponent} from './signin-modal/sign-in-modal.component';
import {LogInModalComponent} from './login-modal/log-in-modal.component';
import {ReactiveFormsModule} from "@angular/forms";
import { HomeComponent } from './home/home.component';
import { RecruiterComponent } from './recruiter/recruiter.component';
import { JobComponent } from './job/job.component';
import { NewJobModalComponent } from './job/new-job/new-job-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HeaderComponent,
    SignInModalComponent,
    LogInModalComponent,
    HomeComponent,
    RecruiterComponent,
    JobComponent,
    NewJobModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
