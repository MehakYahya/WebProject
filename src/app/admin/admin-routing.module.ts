import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ManageSellersComponent } from './components/manage-sellers/manage-sellers.component';
import { ManageCustomersComponent } from './components/manage-customers/manage-customers.component';
import { ViewProductComponent} from './components/view-product/view-product.component';
// Services
import { AdminAuthGuardService } from './services/admin-auth-guard.service';

const routes: Routes = [
  { path: 'login', component: AdminLoginComponent },
  {
    path: 'dashboard',
    component: AdminDashboardComponent,
    canActivate: [AdminAuthGuardService],
    children: [
      { path: 'manage-sellers', component: ManageSellersComponent },
      { path: 'manage-customers', component: ManageCustomersComponent },
      { path: 'view-products', component: ViewProductComponent }, // Route for products
      { path: '', redirectTo: 'manage-sellers', pathMatch: 'full' }, // Default child route
    ],
  },
  { path: '', redirectTo: '/admin/login', pathMatch: 'full' }, // Default route to login
  { path: '**', redirectTo: '/admin/login' }, // Catch-all route for invalid paths
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
