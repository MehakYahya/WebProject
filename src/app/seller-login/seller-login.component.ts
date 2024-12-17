import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-seller-login',
  standalone: true,
  templateUrl: './seller-login.component.html',
  styleUrls: ['./seller-login.component.css'],
  imports: [ReactiveFormsModule, NgIf, FormsModule],
})
export class SellerLoginComponent {
  email: string = ''; // Define the email variable
  password: string = ''; // Define the password variable
  message: string = ''; // Define the message variable

  constructor(private authService: AuthService, private router: Router) {} // Inject Router

  // Define the login method
  login() {
    if (!this.email || !this.password) {
      alert('Please fill out both email and password fields.');
    }
    this.authService.login(this.email, this.password).subscribe(
      (success: boolean) => { // Use boolean as the response type
        if (success) {
          this.message = 'Login successful!';
          this.router.navigate(['/home']).then(() => {
            console.log('Navigated to login');  // Log success when navigation is successful
          }); // Safe to use 'this.router' now
        } else {
          this.message = 'Login failed: Invalid credentials or account not approved.';
        }
      },
      (error: any) => {
        console.error('Login error:', error);
        this.message = 'An error occurred. Please try again.';
      }
    );
  }
}
