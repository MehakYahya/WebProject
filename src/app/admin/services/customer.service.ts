import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiBase = '/api/customers';

  constructor(private http: HttpClient) {}

  getAllCustomers() {
    return this.http.get<any[]>(`${this.apiBase}`);
  }
}
