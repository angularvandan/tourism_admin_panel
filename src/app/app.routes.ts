import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminLoginScreenComponent } from './pages/admin-login-screen/admin-login-screen.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { ProductManagementComponent } from './pages/product-management/product-management.component';
import { guardGuard } from './auth/guard.guard';
import { ToursManagementComponent } from './pages/tours-management/tours-management.component';

export const routes: Routes = [
  { path: '', component: AdminLoginScreenComponent },
  { path: 'login', component: AdminLoginScreenComponent },
  { path: 'user-management', component: UserManagementComponent },
  { path: 'dashboard', component: DashboardComponent,canActivate: [guardGuard] },
  { path: 'tours', component: ToursManagementComponent,canActivate: [guardGuard] },
  { path: 'product-management', component: ProductManagementComponent },
];
