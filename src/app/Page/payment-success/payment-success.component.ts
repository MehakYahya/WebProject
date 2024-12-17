import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent {

  constructor(private router: Router) {}

  message: string = 'Your payment was successful! Thank you for your purchase.';

  goBack() {
    this.router.navigate(['/products']).then(() => {
      console.log('Navigated to login');  // Log success when navigation is successful
    });
  }
}
