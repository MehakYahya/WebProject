import { Injectable } from '@angular/core';

export interface User {
  name: string;
  password: string;
  phone: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = []; // User array
  private currentUser: string | null = null;

  register(user: User): boolean {
    const exists = this.users.find((u) => u.name === user.name);
    if (!exists) {
      this.users.push(user);
      return true; // Registration successful
    }
    return false; // User already exists
  }

  login(name: string, password: string): boolean {
    const user = this.users.find((u) => u.name === name && u.password === password);
    if (user) {
      this.currentUser = name;
      return true; // Login successful
    }
    return false; // Invalid credentials
  }

  logout() {
    this.currentUser = null;
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  getCurrentUser(): string | null {
    return this.currentUser;
  }
}
