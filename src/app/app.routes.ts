import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminLoginScreenComponent } from './pages/admin-login-screen/admin-login-screen.component';
import { guardGuard } from './auth/guard.guard';
import { ToursManagementComponent } from './pages/tours-management/tours-management.component';
import { SpotsManagementComponent } from './pages/spots-management/spots-management.component';
import { ActivityManagementComponent } from './pages/activity-management/activity-management.component';
import { BlogManagementComponent } from './pages/blog-management/blog-management.component';

export const routes: Routes = [
  { path: '', component: AdminLoginScreenComponent },
  { path: 'login', component: AdminLoginScreenComponent },
  { path: 'dashboard', component: DashboardComponent,canActivate: [guardGuard] },
  { path: 'tours', component: ToursManagementComponent,canActivate: [guardGuard] },
  { path: 'spots', component: SpotsManagementComponent,canActivate: [guardGuard] },
  { path: 'activities', component: ActivityManagementComponent,canActivate: [guardGuard] },
  { path: 'blogs', component: BlogManagementComponent,canActivate: [guardGuard] },
];
