import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent {
  message: string = 'Your payment was successful! Thank you for your purchase.';

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/view-products']).then(() => {
      console.log('Navigated to View Products'); // Log success when navigation is successful
    });
  }
}
