import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ManageSellersComponent } from './components/manage-sellers/manage-sellers.component';
import { ManageCustomersComponent } from './components/manage-customers/manage-customers.component';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';

const routes: Routes = [
  { path: 'login', component: AdminLoginComponent },
  {
    path: 'dashboard',
    component: AdminDashboardComponent,
    canActivate: [AdminAuthGuardService], // Protect the dashboard route
    children: [
      { path: 'manage-sellers', component: ManageSellersComponent },
      { path: 'manage-customers', component: ManageCustomersComponent },
    ],
  },
  { path: '', redirectTo: '/admin/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
