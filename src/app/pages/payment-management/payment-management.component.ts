import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { CustomFormCompomemt } from '../../components/customForm/customform.component';
import { CustomTableComponent } from '../../components/customTable/customtable.component';

@Component({
  selector: 'app-payment-management',
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
  templateUrl: './payment-management.component.html',
  styleUrl: './payment-management.component.css'
})
export class PaymentManagementComponent implements OnInit {
  constructor(
    private api: ApiService,
  ) { }
  columns = [
    { field: 'orderID', header: 'Order Id' },
    { field: 'bookingId', header: 'Booking Id' },
    { field: 'paymentStatus', header: 'Payment Status' },
    // { field: 'payerID', header: 'Pa' },
    { field: 'paymentDate', header: 'Payment Date' },
    
  ];
  columnsDetails=[
    { field: 'orderID', header: 'Order Id' },
    { field: 'bookingId', header: 'Booking Id' },
    { field: 'paymentStatus', header: 'Payyment Status' },
    { field: 'paymentDate', header: 'Payment Date' },
  ];
  rowDetailsHeader:string='Payment Details';
  paginator = true;
  rowsPerPageOptions = [5, 10, 15];
  initialRowsPerPage = 5;
  loading: boolean = true;
  paymentData: any[] = [];
  visible: boolean = false;

  actionButtonStatus={
    view:true,
    edit:false,
    delete:false,
  }

  ngOnInit(): void {
    this.getPayment();
  }

  getPayment() {
    this.api.getPayments().subscribe((res: any) => {
      this.paymentData = res;
      console.log(res);
      this.loading = false;
    });
  }
}