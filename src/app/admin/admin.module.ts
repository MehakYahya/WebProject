import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ManageSellersComponent } from './components/manage-sellers/manage-sellers.component';
import { ManageCustomersComponent } from './components/manage-customers/manage-customers.component';
import { SupportTicketsComponent } from './components/support-tickets/support-tickets.component';

import { AdminRoutingModule } from './admin-routing.module';
import { AuthService } from './services/auth.service';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { SellerService } from './services/seller.service';
import { CustomerService } from './services/customer.service';
import { SupportService } from './services/support.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    AdminLoginComponent,
    AdminDashboardComponent,
    ManageSellersComponent,
    ManageCustomersComponent,
    SupportTicketsComponent,
  ],
  providers: [
    provideHttpClient(),
    AuthService,
    AdminAuthGuardService,
    SellerService,
    CustomerService,
    SupportService, // Added SupportService
  ],
})
export class AdminModule {}
