import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registration.component.html',
})
export class RegistrationComponent {
  name = '';
  password = '';
  phone = '';
  email = '';
  address = '';

  constructor(
    private userService: UserService, // Retain UserService for local validation or logic
    private router: Router,
    private http: HttpClient
  ) {}

  // Register User and connect to the backend
  registerUser() {
    if (this.name && this.password && this.phone && this.email && this.address) {
      const customerDetails = {
        name: this.name,
        password: this.password,
        phone: this.phone,
        email: this.email,
        address: this.address,
      };

      // Local validation with UserService
      const localRegistrationSuccess = this.userService.register({
        name: this.name,
        password: this.password,
        phone: this.phone,
      });

      if (!localRegistrationSuccess) {
        alert('User already exists in the local database!');
        return;
      }

      // Send user data to the backend
      this.http.post('http://localhost:3000/customer/signup', customerDetails).subscribe(
        (response) => {
          alert('Registration successful! Please login.');
          this.router.navigate(['/login']);
        },
        (error) => {
          alert('Error during registration! Please contact support.');
        }
      );
    } else {
      alert('All fields are required!');
    }
  }
}
