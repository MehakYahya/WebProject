import { Routes } from '@angular/router';
import { LoginComponent } from './Page/login/login.component';
import { RegistrationComponent } from './Page/registration/registration.component';
import { ViewProductComponent } from './Page/view-product/view-product.component';
import { CartComponent } from './Page/cart/cart.component';
import { CheckoutComponent } from './Page/checkout/checkout.component';
import { PaymentSuccessComponent } from './Page/payment-success/payment-success.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'view-products', component: ViewProductComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'payment-success', component: PaymentSuccessComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Default route
];
