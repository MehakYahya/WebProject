import { Component } from '@angular/core';
import { UserService } from './service/user.service';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private userService: UserService, private router: Router) {}

  isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }

  logoff() {
    this.userService.logout();
    alert('You have been logged out.');
    this.router.navigate(['/login']); // Redirect to login page
  }
}
