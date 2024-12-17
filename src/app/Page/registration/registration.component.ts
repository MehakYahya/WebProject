import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';

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

  constructor(private userService: UserService, private router: Router) {}

  registerUser() {
    if (this.name && this.password && this.phone) {
      const success = this.userService.register({
        name: this.name,
        password: this.password,
        phone: this.phone,
      });
      if (success) {
        alert('Registration successful! Please login.');
        this.router.navigate(['/login']);
      } else {
        alert('User already exists!');
      }
    } else {
      alert('All fields are required!');
    }
  }
}
