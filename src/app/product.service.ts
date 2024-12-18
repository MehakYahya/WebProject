import { Injectable } from '@angular/core';
import {BehaviorSubject, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsSource = new BehaviorSubject<{ name: string; price: number; image: string; description: string;quantity: number }[]>([]);
  products$ = this.productsSource.asObservable();
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {
  }

  // Add product (only Seller can add)
  getProducts() {
    return this.http.get<any[]>(`${this.apiUrl}/api/products`).subscribe(
      (products) => {
        this.productsSource.next(products); // Update the local state with products
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }


  addProduct(product: { name: string; price: number; image: string; description: string; quantity: number }) {
    return this.http.post<any>(`${this.apiUrl}/api/products`, product).pipe(
      tap((newProduct) => {

        // Update the local products list with the newly added product
        const currentProducts = this.productsSource.value;
        this.productsSource.next([...currentProducts, newProduct]);
      })
    );
  }

}
