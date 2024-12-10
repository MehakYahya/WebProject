import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
  standalone: true,
  imports: [FormsModule, NgIf],
})
export class AdminLoginComponent {
  email: string = '';
  password: string = '';
  loginError: string = '';
  loading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    if (!this.email || !this.password) {
      this.loginError = 'Email and password are required.';
      return;
    }

    this.loading = true;

    this.authService.loginAdmin(this.email, this.password).subscribe({
      next: (response) => {
        this.loading = false;
        if (response && response.token) {
          localStorage.setItem('adminToken', response.token);
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.loginError = 'Invalid response from server.';
        }
      },
      error: (error) => {
        this.loading = false;
        this.loginError = error.error?.message || 'Invalid email or password.';
      },
    });
  }
}
