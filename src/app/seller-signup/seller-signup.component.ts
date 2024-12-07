import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-seller-signup',
  templateUrl: './seller-signup.component.html',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  styleUrls: ['./seller-signup.component.css']
})
export class SellerSignupComponent {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  // Custom validator to check if passwords match
  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : {passwordMismatch: true};
  }

  onSignup() {
    if (this.signupForm.valid) {
      const {name, email, password} = this.signupForm.value;

      try {
        // Call AuthService signup method
        const response = this.authService.signup({name, email, password});

        // Show success alert
        alert(response.message);

        // Navigate to login page
        this.router.navigate(['/seller/login']).then(() => {
          // Optionally handle after navigation, if needed
        });
      } catch (error: any) { // Assert error as 'any'
        console.error('Signup error:', error); // Use error directly, no need to use .message for 'any'
        alert(error?.message || 'Signup failed. Please try again later.'); // Provide fallback error message
      }
    } else {
      alert('Please fill out the form correctly.');
    }
  }
}
