import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { CustomFormCompomemt } from '../../components/customForm/customform.component';
import { CustomTableComponent } from '../../components/customTable/customtable.component';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-feedback-management',
  standalone: true,
  providers: [MessageService, ConfirmationService],
  imports: [
    PanelModule,
    CustomTableComponent,
    DialogModule,
    CustomFormCompomemt,
    FileUploadModule,
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
  ],
  templateUrl: './feedback-management.component.html',
  styleUrl: './feedback-management.component.css'
})
export class FeedbackManagementComponent implements OnInit {
  constructor(
    private api: ApiService,
  ) { }
  columns = [
    { field: 'first_name', header: 'First Name' },
    { field: 'last_name', header: 'Last Name' },
    { field: 'email', header: 'Email' },
    { field: 'phone', header: 'Phone' },
    { field: 'message', header: 'Message' },
    
  ];
  columnsDetails=[
    { field: 'first_name', header: 'First Name' },
    { field: 'last_name', header: 'Last Name' },
    { field: 'email', header: 'Email' },
    { field: 'phone', header: 'Phone' },
    { field: 'message', header: 'Message' },
  ];
  rowDetailsHeader:string='Feedback Management';
  paginator = true;
  rowsPerPageOptions = [5, 10, 15];
  initialRowsPerPage = 5;
  loading: boolean = true;
  feedbackData: any[] = [];
  visible: boolean = false;

  actionButtonStatus={
    view:true,
    edit:false,
    delete:false,
  }

  ngOnInit(): void {
    this.getFeedbacks();
  }

  getFeedbacks() {
    this.api.getFeedbacks().subscribe((res: any) => {
      this.feedbackData = res;
      console.log(res);
      this.loading = false;
    });
  }

}
