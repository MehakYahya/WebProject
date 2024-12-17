import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-view-product',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule
  ],
  templateUrl: './view-product.component.html',
})
export class ViewProductComponent {
  products = [
    {
      name: 'Product 1',
      description: 'This is a great product.',
      price: 100,
      quantity: 10,
      selectedQuantity: 1,
    },
    {
      name: 'Product 2',
      description: 'Another excellent product.',
      price: 200,
      quantity: 5,
      selectedQuantity: 1,
    },
  ];

  cart: any[] = [];

  addToCart(product: any) {
    this.cart.push({ ...product });
    alert(`${product.name} added to cart.`);
  }

  viewCart() {
    console.log('Cart Contents:', this.cart);
    alert('Navigating to the cart page (placeholder)');
  }
}
