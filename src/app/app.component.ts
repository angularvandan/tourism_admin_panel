import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
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

  submitForm(formData: any): void {
    // Handle form submission
    console.log('Form Data:', formData);
    // You can call an API service to submit the form data here
  }
}
