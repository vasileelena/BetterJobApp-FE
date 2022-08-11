import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {NgbActiveModal, NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {LogInModalComponent} from "../home/login-modal/log-in-modal.component";
import {ActivatedRoute, Router} from "@angular/router";
import {SignInModalComponent} from "../home/signin-modal/sign-in-modal.component";

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

  isUserRecruiter(): boolean {
    return this.authService.isUserRecruiter();
  }

  openLoginModal() {
    const modalOptions: NgbModalOptions = {backdrop: 'static', size: 'md'}
    this.modalService.open(LogInModalComponent, modalOptions);

  }

  openSigninModal() {
    const modalOptions: NgbModalOptions = {backdrop: 'static', size: 'md'}
    this.modalService.open(SignInModalComponent, modalOptions);

  }

  navigateToProfile() {
    let currentUserEmail: string | null = sessionStorage.getItem('email');
    if(currentUserEmail !== null) {
      this.router.navigate(['/user/profile', currentUserEmail]);
    }
  }

}
