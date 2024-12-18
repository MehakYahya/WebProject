import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsSource = new BehaviorSubject<any[]>([]); // BehaviorSubject for state management
  private apiUrl = 'http://localhost:3000/api/products'; // Backend endpoint

  products$: Observable<any[]> = this.productsSource.asObservable();

  constructor(private http: HttpClient) {}

  fetchProducts(): void {
    this.http.get<any[]>(this.apiUrl).subscribe(
      (products) => {
        this.productsSource.next(products); // Update local state
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
}
