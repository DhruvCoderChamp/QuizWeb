import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './modules/auth/services/auth.service';
import { LocalstorageService } from './modules/auth/services/localstorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'quizWeb';
  user: any = null;
  defaultAvatar = 'assets/user.png';

  isUserLoggedIn: boolean = false;
  isAdminLoggedIn: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // Update user state from local storage
    this.user = LocalstorageService.getUser();
    this.isUserLoggedIn = LocalstorageService.isUserLoggedIn();
    this.isAdminLoggedIn = LocalstorageService.isAdminLoggedIn();

    // Optional: auto-refresh if user info changes
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
      this.isUserLoggedIn = LocalstorageService.isUserLoggedIn();
      this.isAdminLoggedIn = LocalstorageService.isAdminLoggedIn();
    });
  }

  logout(): void {
    LocalstorageService.signout();
    this.user = null;
    this.isUserLoggedIn = false;
    this.isAdminLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
