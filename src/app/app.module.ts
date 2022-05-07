import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { HttpClientModule} from "@angular/common/http";
import { HeaderComponent } from './header/header.component';
import { SignInModalComponent } from './signin-modal/sign-in-modal.component';
import { LogInModalComponent } from './login-modal/log-in-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HeaderComponent,
    SignInModalComponent,
    LogInModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
