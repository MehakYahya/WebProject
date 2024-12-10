import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiBase = 'http://localhost:3000/api/auth'; // Ensure this is the correct API URL

  constructor(private http: HttpClient) {}

  loginAdmin(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiBase}/admin-login`, { email, password });
  }
}
