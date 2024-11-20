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
    { field: 'readableBookingId', header: 'ID' },
    { field: 'user_name', header: 'Name' },
    { field: 'user_mobile', header: 'Mobile' },
    { field: 'user_email', header: 'Email' },
    { field: 'user_address', header: 'Address' },
    { field: 'totalPrice', header: 'Total Price' },
    { field: 'tours_details', header: 'Tours Details' },
    { field: 'priceDetails', header: 'User Details' },
    { field: 'paymentStatus', header: 'Payment Status' },
    
  ];
  columnsDetails=[
    { field: 'readableBookingId', header: 'ID' },
    { field: 'user_name', header: 'Name' },
    { field: 'user_mobile', header: 'Mobile' },
    { field: 'user_address', header: 'Address' },
    { field: 'tours_details', header: 'Tours Details' },
    { field: 'totalPrice', header: 'Total Price' },
    { field: 'paymentStatus', header: 'Payment Status' },

  ];
  rowDetailsHeader:string='Booking Details';
  paginator = true;
  rowsPerPageOptions = [5, 10, 15];
  initialRowsPerPage = 5;
  loading: boolean = true;
  bookingData: any[] = [];
  visible: boolean = false;
  booking_id!:any;
  header:string="Update Booking";
  preFilledData!:any;
  message:string='';

  actionButtonStatus={
    view:true,
    edit:true,
    delete:false,
    add:false
  }

  inputFields = [
    {
      type: 'select',
      fields: {
        label: 'Booking Status',
        name: 'paymentStatus',
        placeholder: 'Enter Status',
        required: true,
        options: [
          {name:'Completed',code:'Completed'},
          {name:'Pending',code:'Pending'}
        ],
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

  updateData(data:any){
    console.log(data);

    this.showDialog(true);

    this.booking_id=data._id;
    
    this.preFilledData={paymentStatus:{name:data.paymentStatus,code:data.paymentStatus}};
    console.log(this.preFilledData);
  }

  // update tours 
  onSubmitUpdateForm(formData: any) {
    console.log(formData);
    formData={paymentStatus:formData.paymentStatus.code};
    console.log(formData);

    this.api.updateBooking(formData,this.booking_id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.getBookings();
        this.message="Booking Updated Successfully";
        this.showDialog(false);
        // Reset `message` to allow for the same message again later
        setTimeout(() => {
          this.message = ''; // Clears message without triggering additional toast
        }, 0);
        
        setTimeout(() => {
          this.showDialog(false);
        }, 1500);
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }

  // create tours 
  onSubmitAddForm(formData: any) {
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
