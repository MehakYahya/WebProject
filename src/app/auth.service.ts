import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users: { [email: string]: { name: string; password: string } } = {};
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor() {
    const isAuthenticated = localStorage.getItem('authToken') !== null;
    this.loggedIn.next(isAuthenticated);
  }
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }
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
      this.loggedIn.next(true);
      return true;
    }
    return false;
  }

  isAuthenticated(): boolean {
    return this.loggedIn.value;  }


  logout(): void {
    localStorage.removeItem('authToken');
    this.loggedIn.next(false);
  }
}
