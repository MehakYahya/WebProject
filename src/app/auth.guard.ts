import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service'; // Ensure path to AuthService is correct

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true; // Allow navigation if authenticated
    } else {
      // Redirect to login page if not authenticated
      this.router.navigate(['/seller/login']).then(() => {
        // Optionally handle after navigation, if needed
      });
      return false; // Prevent access to the route
    }
  }
}
