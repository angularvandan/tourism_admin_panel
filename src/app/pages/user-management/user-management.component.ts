import { Component, OnInit } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { CustomTableComponent } from '../../components/customTable/customtable.component';
import { ApiService } from '../../services/api/api.service';
import {
  ConfirmationService,
  MessageService,
  ConfirmEventType,
} from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { CustomFormCompomemt } from '../../components/customForm/customform.component';
import { FileUploadModule } from 'primeng/fileupload';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-user-management',
  standalone: true,
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css',
  providers: [MessageService, ConfirmationService],
  imports: [
    PanelModule,
    CustomTableComponent,
    DialogModule,
    CustomFormCompomemt,
    FileUploadModule,
    CommonModule,
  ],
})
export class UserManagementComponent implements OnInit {
  constructor(
    private api: ApiService,
    private messageServies: MessageService,
    private confirmationService: ConfirmationService
  ) {}
  columns = [
    { field: 'username', header: 'Name' },
    { field: 'email', header: 'Email' },
    { field: 'mobile_no', header: 'Phone' },
    { field: 'country', header: 'Country' },
  ];
  paginator = true;
  rowsPerPageOptions = [5, 10, 15];
  initialRowsPerPage = 5;
  loading: boolean = true;
  userData: any[] = [];
  visible: boolean = false;
  
  inputFields = [
    {
      type: 'text',
      fields: {
        label: 'Email',
        name: 'email',
        placeholder: 'Enter Email',
        required: true,
      },
    },
    {
      type: 'text',
      fields: {
        label: 'Password',
        name: 'password',
        placeholder: 'Enter Password',
        required: true,
      },
    },
    {
      type: 'text',
      fields: {
        label: 'Username',
        name: 'username',
        placeholder: 'Enter Username',
        required: true,
      },
    },
    {
      type: 'text',
      fields: {
        label: 'Mobile No',
        name: 'mobile_no',
        placeholder: 'Enter mobile_no',
        required: true,
      },
    },
    {
      type: 'text',
      fields: {
        label: 'Country',
        name: 'country',
        placeholder: 'Enter Country Name',
        required: true,
      },
    },
    {
      type: 'date',
      fields: {
        label: 'DOB',
        name: 'dob',
        placeholder: 'Enter DOB',
        required: true,
      },
    },
    {
      type: 'text',
      fields: {
        label: 'role',
        name: 'role',
        placeholder: 'Enter role',
        required: true,
      },
    },
    {
      type: 'file',
      fields: {
        label: 'Choose',
        name: 'file',
        required: true,
      },
    },
  ];
  ngOnInit(): void {
    this.getusers();
  }

  getusers() {
    this.api.getUsers().subscribe((res: any) => {
      this.userData = res.users;
      console.log(res);
      this.loading = false;
    });
  }

  showDialog(visible: any) {
    this.visible = visible;
  }

  deleteData(id: any) {
    this.api.deleteUser(id).subscribe((res: any) => {
      console.log(res);
    });
  }

  onSubmitAddForm(formData: any) {
    this.api.createUser(formData).subscribe((res: any) => {
      console.log(res);
      this.getusers();
    });
    console.log(formData);
  }

  confirm2(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.messageServies.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Record deleted',
        });
      },
      reject: () => {
        this.messageServies.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
        });
      },
    });
  }
}
