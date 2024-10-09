import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomFormCompomemt } from './components/customForm/customform.component';
import { CustomTableComponent } from './components/customTable/customtable.component';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    RouterOutlet,
    HeaderComponent,
    CardModule,
    CommonModule,
    FormsModule,
    CustomFormCompomemt,
    CustomTableComponent,
  ],
})
export class AppComponent {
  title = 'frontend';

  showHeader: boolean = true;

  constructor(private router: Router) {
    // Subscribe to router events to check for the active route
    this.router.events.subscribe(() => {
      this.checkRoute();
    });
  }

  checkRoute() {
    // Hide header on specific routes
    const currentRoute = this.router.url;
    if (currentRoute === '/login' || currentRoute === '/register') {
      this.showHeader = false;
    } else {
      this.showHeader = true;
    }
  }

}
