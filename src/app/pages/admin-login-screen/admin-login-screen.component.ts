import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { ApiService } from '../../services/api/api.service';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';



@Component({
  selector: 'app-admin-login-screen',
  standalone: true,
  templateUrl: './admin-login-screen.component.html',
  styleUrl: './admin-login-screen.component.css',
  providers:[MessageService],
  imports: [
    InputTextModule,
    ButtonModule,
    PasswordModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule
  ]
})
export class AdminLoginScreenComponent {
  email!: string
  password!: string

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,private apiService:ApiService,private router:Router,private messageServies: MessageService,
  ) {

    if (this.apiService.currentUser.token) {
      this.router.navigate(['/dashboard']);
    }

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      console.log('Form Submitted!', formData);

      this.apiService.loginUser(formData).subscribe({
        next:(res:any)=>{
          // console.log(res);
          this.router.navigate(['/dashboard']);
        },error:(err:any)=>{
          console.log(err);
          this.messageServies.add({ severity: 'error', summary: 'Error', detail: err.error.message });

        }
      });
      // Handle login logic here
    } else {
      console.log('Form not valid');
    }
  }
}
