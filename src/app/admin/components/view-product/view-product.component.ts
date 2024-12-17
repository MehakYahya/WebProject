import { Component, OnInit } from '@angular/core';
import { ProductService} from '../../services/product.service';// Import ProductService
import {CurrencyPipe, NgForOf} from '@angular/common';

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
  imports: [NgForOf, CurrencyPipe],
  standalone: true
})
export class ViewProductComponent implements OnInit {
  products: Product[] = []; // Local product array

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // Fetch products on component initialization
    this.productService.fetchProducts();
    this.productService.products$.subscribe((products: Product[]) => {
      this.products = products;
    });
  }
}
