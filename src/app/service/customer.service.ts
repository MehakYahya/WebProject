import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private productsSource = new BehaviorSubject<any[]>([]); // Local state for view-product
  private apiUrl = 'http://localhost:3000'; // Replace with your backend URL
  products$: Observable<any[]> = this.productsSource.asObservable(); // Initialize view-product$ as an observable

  constructor(private http: HttpClient) {}

  getProducts() {
    this.http.get<any[]>(`${this.apiUrl}/api/products`).subscribe(
      (products) => {
        this.productsSource.next(products); // Update the local state with fetched view-product
      },
      (error) => {
        console.error('Error fetching view-product:', error);
      }
    );
  }
}
