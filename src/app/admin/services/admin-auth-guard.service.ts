import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuardService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('adminToken');
    if (token) {
      return true; // Allow access to the route
    } else {
      // Handle navigation and provide a complete callback if needed
      this.router.navigate(['/admin/login']).then(() => {
        console.log('Redirected to login page'); // Optional: log the redirection
      });
      return false; // Prevent access to the route
    }
  }
}
