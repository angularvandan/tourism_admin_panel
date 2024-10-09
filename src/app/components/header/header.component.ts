import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuItem } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

// import { EventEmitter } from 'stream';
@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [
    ToolbarModule,
    SplitButtonModule,
    InputTextModule,
    SidebarComponent,
    CommonModule
  ],
})
export class HeaderComponent {
  @Input() isSidebarVisible = new EventEmitter<boolean>();
  items: MenuItem[] | undefined;
  isLight = this.themeService.getStoredTheme() === 'lara-light-blue'

  storedTheme: any

  constructor(private themeService: ThemeService) {
  }

  ngOnInit() {
    if (!this.isLight) {
      const newTheme = 'lara-dark-blue'
      this.themeService.changeTheme(newTheme)
    }
    else {
      const newTheme = 'lara-light-blue'
      this.themeService.changeTheme(newTheme)
    }
    this.items = [
      {
        label: 'Profile',
        icon: 'pi pi-user',
      },
      {
        label: 'Logout',
        icon: 'pi pi-power-off',
      },
    ];
  }

  toggleTheme(theme: string) {
    this.themeService.changeTheme(theme)
    this.isLight = !this.isLight
  }

  toggleSidebar($event: any) {
    console.log('Toggle Sidebar');
  }
}
