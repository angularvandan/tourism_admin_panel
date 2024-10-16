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
  selector: 'app-booking-management',
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
  ],  templateUrl: './booking-management.component.html',
  styleUrl: './booking-management.component.css'
})
export class BookingManagementComponent  implements OnInit {
  constructor(
    private api: ApiService,
    private messageServies: MessageService,
    private confirmationService: ConfirmationService
  ) { }
  columns = [
    { field: 'user_name', header: 'Name' },
    { field: 'user_mobile', header: 'Mobile' },
    { field: 'user_address', header: 'Address' },
    { field: 'totalPrice', header: 'Total Price' },
    { field: 'tours_details', header: 'Tours Details' },
    { field: 'priceDetails', header: 'User Details' },
    
  ];
  paginator = true;
  rowsPerPageOptions = [5, 10, 15];
  initialRowsPerPage = 5;
  loading: boolean = true;
  bookingData: any[] = [];
  visible: boolean = false;

  inputFields = [
    {
      type: 'text',
      fields: {
        label: 'Booking Status',
        name: 'booking_status',
        placeholder: 'Enter Status',
        required: true,
      },
    },
    
  ];

  ngOnInit(): void {
    this.getBookings();
  }

  getBookings() {
    this.api.getBookings().subscribe((res: any) => {
      this.bookingData = res;
      console.log(res);
      this.loading = false;
    });
  }

  showDialog(visible: any) {
    this.visible = visible;
  }

  // create tours 
  onSubmitAddForm(formData: any) {
    console.log(formData);

    this.api.createTours(formData).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.getBookings();
      },
      error:(err:any)=>{
        console.log(err);
      }
    })

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
