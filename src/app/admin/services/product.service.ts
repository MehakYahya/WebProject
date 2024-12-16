import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsSource = new BehaviorSubject<any[]>([]); // Local state for products
  private apiUrl = 'http://localhost:3000/api/products'; // Backend API URL for products

  products$: Observable<any[]> = this.productsSource.asObservable(); // Observable for products

  constructor(private http: HttpClient) {}

  // Fetch all products from the backend
  fetchProducts(): void {
    this.http.get<any[]>(this.apiUrl).subscribe(
      (products) => {
        this.productsSource.next(products); // Update the product state
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
}
