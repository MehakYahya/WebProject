import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
  ]
})
export class AdminDashboardComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onLogout(): void {
    const confirmLogout = confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      this.authService.logoutAdmin();
      this.router.navigate(['/admin/login']).then(() => {
        console.log('Admin logged out and redirected to login page.');
      });
    }
  }

}
