import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users: { [email: string]: { name: string; password: string } } = {};

  signup(user: { name: string; email: string; password: string }): { message: string } {
    if (this.users[user.email]) {
      throw new Error('User already exists');
    }
    this.users[user.email] = { name: user.name, password: user.password };
    return { message: 'Signup Successful!' };
  }


  login(email: string, password: string): boolean {
    const user = this.users[email];
    if (user && user.password === password) {
      localStorage.setItem('authToken', 'sample-token');
      return true;
    }
    return false;
  }



  isAuthenticated(): boolean {
    return localStorage.getItem('authToken') !== null;
  }


  logout(): void {
    localStorage.removeItem('authToken');

  }
}
