import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsSource = new BehaviorSubject<{ name: string; price: number; image: string; description: string;quantity: number }[]>([]);
  products$ = this.productsSource.asObservable();

  constructor() {}

  addProduct(product: { name: string; price: number; image: string ; description: string,quantity: number}) {
    const currentProducts = this.productsSource.value;
    this.productsSource.next([...currentProducts, product]);
  }
}

