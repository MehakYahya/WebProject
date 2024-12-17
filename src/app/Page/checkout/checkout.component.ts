import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',  // Change selector if needed
  templateUrl: './checkout.component.html',
  imports: [
    ReactiveFormsModule
  ],
  // Update file name
  styleUrls: ['./checkout.component.css']  // Update file name
})
export class CheckoutComponent implements OnInit {
  paymentForm: FormGroup;
  cartItems: any[] = [];  // Assume this is the cart array with items and prices
  totalAmount: number = 0;
  constructor(private fb: FormBuilder, private router: Router) {
    this.paymentForm = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      payment: ['', [Validators.required]]  // Add proper validation for payment info
    });
  }

  ngOnInit(): void {
    this.cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    this.calculateTotalAmount();
  }

  calculateTotalAmount() {
    this.totalAmount = this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }
  onSubmit(): void {
    if (this.paymentForm.valid) {
      const paymentDetails = this.paymentForm.value;
      console.log('Payment Details:', paymentDetails);

      localStorage.removeItem('cart');
      console.log('Cart cleared');
      // After successful submission, navigate to a success or confirmation page
      this.router.navigate(['/payment-success']).then(() => {
        console.log('Payment details submitted');
      });
    } else {
      alert('Please fill out the form correctly');
    }
  }

  goBackToCart(): void {
    this.router.navigate(['/cart']).then(() => {
      console.log('Navigated back to cart');
    });
  }
}
