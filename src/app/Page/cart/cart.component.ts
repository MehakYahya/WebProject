import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForOf, NgIf } from '@angular/common';

interface Product {
  name: string;
  price: number;
  image: string;
  description: string;
  quantity: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [
    NgForOf,
    NgIf
  ]
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];

  constructor(private router: Router) {}

  getTotalAmount(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  ngOnInit(): void {
    // Retrieve cart items from localStorage when the component initializes
    const savedCart = localStorage.getItem('cart');
    this.cartItems = savedCart ? JSON.parse(savedCart) : [];
  }
  removeFromCart(index: number) {
    // Remove item from the cart array
    this.cartItems.splice(index, 1);

    // Update the cart in localStorage
    localStorage.setItem('cart', JSON.stringify(this.cartItems));

    alert('Item removed from cart.');
  }
  continueShopping() {
    this.router.navigate(['/products']).then(() => {
      console.log('Navigated to view-product');
    });
  }

  proceedToPay() {
    this.router.navigate(['/checkout']).then(() => {
      console.log('Navigated to payment page');
    });
  }
}
