import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-seller-login',
  standalone: true,
  templateUrl: './seller-login.component.html',
  styleUrls: ['./seller-login.component.css'],
  imports: [ReactiveFormsModule, NgIf]
})
export class SellerLoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    protected authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const loginSuccess = this.authService.login(email, password);

      if (loginSuccess) {
        this.router.navigate(['/home']).then(() => {
        });
      } else {
        alert('Invalid credentials. Please try again.');
      }
    } else {
      alert('Please fill out the form correctly.');
    }
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/seller/login']).then(() => {
    });
  }
}
