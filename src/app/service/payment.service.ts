import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = 'http://localhost:3000/api/orders';  // Adjust URL if necessary

  constructor(private http: HttpClient) {}


  createOrder(paymentDetails: any): Observable<any> {
    return this.http.post(this.apiUrl, paymentDetails);
  }
}
