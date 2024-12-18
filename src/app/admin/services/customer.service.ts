import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiBase = 'http://localhost:3000/admin/customers'; // Backend API endpoint

  constructor(private http: HttpClient) {}

  // Fetch all customers
  getAllCustomers(): Observable<any> {
    return this.http.get<any>(this.apiBase);
  }
}
