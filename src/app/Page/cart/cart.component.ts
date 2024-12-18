import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  imports: [
    RouterLink,
    NgForOf,
    NgIf
  ]
})
export class CartComponent {
  cartItems: any[] = [];

  constructor(private router: Router) {
    this.loadCart();
  }

  loadCart() {
    const cart = localStorage.getItem('cart');
    this.cartItems = cart ? JSON.parse(cart) : [];
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.selectedQuantity, 0);
  }

  removeItem(index: number) {
    this.cartItems.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.cartItems)); // Update localStorage
    this.loadCart(); // Refresh the cart
  }

  proceedToCheckout() {
    this.router.navigate(['/checkout']);
  }
}
