import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { PaymentService } from '../../service/payment.service'; // Import PaymentService

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  paymentForm: FormGroup;
  cartItems: any[] = [];  // Cart array containing items
  totalAmount: number = 0;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private paymentService: PaymentService // Inject PaymentService
  ) {
    this.paymentForm = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      payment: ['', [Validators.required]]  // Add proper validation for payment info
    });
  }

  ngOnInit(): void {
    this.cartItems = JSON.parse(localStorage.getItem('cart') || '[]'); // Load cart from localStorage
    this.calculateTotalAmount();
  }

  calculateTotalAmount(): void {
    this.totalAmount = this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  onSubmit(): void {
    if (this.paymentForm.valid) {
      const paymentDetails = {
        ...this.paymentForm.value,
        totalAmount: this.totalAmount,
        cartItems: this.cartItems,
      };

      // Call the backend API to create an order
      this.paymentService.createOrder(paymentDetails).subscribe(
        (response: any) => {  // Handle the backend response
          console.log('Order created:', response);
          localStorage.removeItem('cart'); // Clear cart
          this.router.navigate(['/payment-success']).then(() => {
            console.log('Payment details submitted');
          });
        },
        (error: HttpErrorResponse) => {  // Handle backend errors
          console.error('Error creating order:', error);
          alert('Failed to process payment. Please try again.');
        }
      );
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
