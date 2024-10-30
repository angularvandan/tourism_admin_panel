import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminLoginScreenComponent } from './pages/admin-login-screen/admin-login-screen.component';
import { guardGuard } from './auth/guard.guard';
import { ToursManagementComponent } from './pages/tours-management/tours-management.component';
import { SpotsManagementComponent } from './pages/spots-management/spots-management.component';
import { ActivityManagementComponent } from './pages/activity-management/activity-management.component';
import { BlogManagementComponent } from './pages/blog-management/blog-management.component';
import { BookingManagementComponent } from './pages/booking-management/booking-management.component';
import { FeedbackManagementComponent } from './pages/feedback-management/feedback-management.component';
import { ContactManagementComponent } from './pages/contact-management/contact-management.component';
import { PaymentManagementComponent } from './pages/payment-management/payment-management.component';
import { PrivacyPolicyComponentimplements } from './pages/privacy-policy/privacy-policy.component';
import { HomeBannerComponent } from './pages/home-banner/home-banner.component';

export const routes: Routes = [
  { path: '', component: AdminLoginScreenComponent },
  { path: 'login', component: AdminLoginScreenComponent },
  { path: 'dashboard', component: DashboardComponent,canActivate: [guardGuard] },
  { path: 'tours', component: ToursManagementComponent,canActivate: [guardGuard] },
  { path: 'spots', component: SpotsManagementComponent,canActivate: [guardGuard] },
  { path: 'activities', component: ActivityManagementComponent,canActivate: [guardGuard] },
  { path: 'blogs', component: BlogManagementComponent,canActivate: [guardGuard] },
  { path: 'bookings', component: BookingManagementComponent,canActivate: [guardGuard] },
  { path: 'payments', component: PaymentManagementComponent,canActivate: [guardGuard] },
  { path: 'feedbacks', component: FeedbackManagementComponent,canActivate: [guardGuard] },
  { path: 'contacts', component:ContactManagementComponent,canActivate: [guardGuard] },
  { path: 'privacy-policy', component:PrivacyPolicyComponentimplements,canActivate: [guardGuard] },
  { path: 'home-banner', component:HomeBannerComponent,canActivate: [guardGuard] },
];
