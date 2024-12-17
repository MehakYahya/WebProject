import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  name = '';
  password = '';

  constructor(private userService: UserService, private router: Router) {}

  async loginUser() {
    if (this.userService.login(this.name, this.password)) {
      alert('Login successful!');
      try {
        await this.router.navigate(['/view-product']); // Handle navigation Promise
      } catch (error) {
        console.error('Navigation failed:', error);
      }
    } else {
      alert('Invalid credentials.');
    }
  }
}
