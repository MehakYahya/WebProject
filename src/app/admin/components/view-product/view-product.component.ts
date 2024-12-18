import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service'; // Import ProductService
import {CurrencyPipe, NgForOf, NgIf} from '@angular/common';

interface Product {
  name: string;
  price: number;
  image: string;
  description: string;
  quantity: number;
}

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css'],
  standalone: true,
  imports: [
    CurrencyPipe,
    NgForOf,
    NgIf
  ]
})
export class ViewProductComponent implements OnInit {
  products: Product[] = []; // Array to store products

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts(); // Fetch products when component initializes
  }

  // Method to fetch all products
  loadProducts(): void {
    this.productService.fetchProducts();
    this.productService.products$.subscribe(
      (products: Product[]) => {
        this.products = products; // Assign products to local array
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
}
