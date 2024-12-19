import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'admin', loadChildren: () => import('./admin/admin.config').then(m => m.AdminConfig) },
  { path: '', redirectTo: '/admin/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/admin/login' },
];
