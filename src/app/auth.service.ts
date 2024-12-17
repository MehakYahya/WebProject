
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Observer} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private apiUrl = 'http://localhost:3000'; // Replace with your server URL

  constructor(private http: HttpClient) {
    const isAuthenticated = localStorage.getItem('authToken') !== null;
    this.loggedIn.next(isAuthenticated);
  }
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }
  signup(user: { name: string; email: string; password: string }): Promise<{ message: string }> {
    return firstValueFrom(this.http.post<{ message: string }>(`${this.apiUrl}/seller/signup`, user));
  }

  login(email: string, password: string): Observable<boolean> {
    return new Observable<boolean>((observer: Observer<boolean>) => {  // Specify Observer type here
      this.http.post<any>(`${this.apiUrl}/seller/login`, { email, password }).subscribe(
        (response) => {
          if (response.message === 'Login successful.') {
            localStorage.setItem('authToken', 'seller-token'); // Store token in localStorage
            this.loggedIn.next(true); // Update login status
            observer.next(true);
          } else {
            this.loggedIn.next(false); // Set login status to false
            observer.next(false);
          }
          observer.complete();
        },
        (error) => {
          console.error('Login failed:', error);
          this.loggedIn.next(false); // Set login status to false on error
          observer.next(false);
          observer.complete();
        }
      );
    });
  }


  isAuthenticated(): boolean {
    return this.loggedIn.value;  }


  logout(): void {
    localStorage.removeItem('authToken');
    this.loggedIn.next(false);
  }
}
