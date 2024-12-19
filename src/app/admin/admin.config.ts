import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

import { AdminRoutes } from './admin.routes';

// Components
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ManageSellersComponent } from './components/manage-sellers/manage-sellers.component';
import { ManageCustomersComponent } from './components/manage-customers/manage-customers.component';
import { ViewProductComponent} from './components/view-product/view-product.component';
import {OrderManagementComponent} from './components/order-management/order-management.component';

// Services
import { AuthService } from './services/auth.service';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { SellerService } from './services/seller.service';
import { CustomerService } from './services/customer.service';
import { ProductService } from './services/product.service';
import {OrderService} from './services/order.service';

@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    AdminRoutes,
    ViewProductComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    ManageSellersComponent,
    ManageCustomersComponent,
    OrderManagementComponent,
  ],
  providers: [
    provideHttpClient(),
    AuthService,
    AdminAuthGuardService,
    SellerService,
    CustomerService,
    ProductService,
    OrderService,
  ],
})
export class AdminConfig {}
