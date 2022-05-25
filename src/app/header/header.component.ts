import {Component, OnInit} from '@angular/core';
import {AuthService} from "../service/auth.service";
import {NgbActiveModal, NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {LogInModalComponent} from "../login-modal/log-in-modal.component";
import {Router} from "@angular/router";
import {SignInModalComponent} from "../signin-modal/sign-in-modal.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsedMenu = true;

  constructor(private authService: AuthService,
              private modalService: NgbModal,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.router.navigate(['/']).then(() => this.authService.logOut());
  }

  isUserLoggedIn(): boolean {
    return this.authService.isUserLoggedIn();
  }

  openLoginModal() {
    const modalOptions: NgbModalOptions = {backdrop: 'static', size: 'md'}
    const modalInstance = this.modalService.open(LogInModalComponent, modalOptions);

    modalInstance.result;
  }

  openSigninModal() {
    const modalOptions: NgbModalOptions = {backdrop: 'static', size: 'sm'}
    const modalInstance = this.modalService.open(SignInModalComponent, modalOptions);

    modalInstance.result;
  }

}
