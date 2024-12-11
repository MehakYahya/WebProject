import {RouterModule, Routes} from '@angular/router';
import { SellerSignupComponent } from './seller-signup/seller-signup.component';
import { SellerLoginComponent } from './seller-login/seller-login.component';
import { HomeComponent } from './home/home.component';
import {NgModule} from '@angular/core';
import {AuthGuard} from './auth.guard';
import { AddProductComponent } from './add-product/add-product.component';
import {ViewProductComponent} from './view-product/view-product.component';
import {OrderManagementComponent} from "./order-management/order-management.component";

export const routes: Routes = [
  { path: 'seller/signup', component: SellerSignupComponent },
  { path: 'seller/login', component: SellerLoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] }, // Protect Home route
  { path: 'add-product', component: AddProductComponent , canActivate: [AuthGuard]  }, // Define the route for add-product
  { path: 'view-product', component: ViewProductComponent, canActivate: [AuthGuard] }, // Add route for ViewProductComponent
  {path:'order-management', component: OrderManagementComponent },
  { path: '', redirectTo: '/seller/signup', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
