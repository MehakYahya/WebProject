import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import {NgForOf, NgIf} from '@angular/common'; // Import the service

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css'],
  imports: [
    NgForOf,
    NgIf
  ]
})
export class ViewProductComponent implements OnInit {
  products: { name: string; price: number; image: string; description: string; quantity: number }[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts();
    this.productService.products$.subscribe((products) => {
      this.products = products;
    });
  }

}

