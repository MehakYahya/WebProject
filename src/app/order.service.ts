import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'http://localhost:3000/api/orders';  // API endpoint for order

  constructor(private http: HttpClient) {}

  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Update order status (if necessary)
  updateOrderStatus(orderId: string, newStatus: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${orderId}`, { status: newStatus });
  }

  private totalOrdersSubject = new BehaviorSubject<number>(0);
  private deliveredOrdersSubject = new BehaviorSubject<number>(0);
  private pendingOrdersSubject = new BehaviorSubject<number>(0);

  totalOrders$ = this.totalOrdersSubject.asObservable();
  deliveredOrders$ = this.deliveredOrdersSubject.asObservable();
  pendingOrders$ = this.pendingOrdersSubject.asObservable();

  updateOrderCounts(total: number, delivered: number, pending: number): void {
    this.totalOrdersSubject.next(total);
    this.deliveredOrdersSubject.next(delivered);
    this.pendingOrdersSubject.next(pending);
  }
}
