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
  selector: 'app-product-management',
  standalone: true,
  providers: [MessageService, ConfirmationService],
  imports: [
    PanelModule,
    CustomTableComponent,
    DialogModule,
    CustomFormCompomemt,
    FileUploadModule,
    CommonModule,
  ],
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.css',
})
export class ProductManagementComponent implements OnInit {
  constructor(
    private api: ApiService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}
  columns = [
    { field: 'index', header: 'Sr.No' },
    { field: 'images', header: 'Images' },
    { field: 'name', header: 'Name' },
  ];
  paginator = true;
  rowsPerPageOptions = [5, 10, 15];
  initialRowsPerPage = 5;
  loading: boolean = true;
  productData: any[] = [];
  visible: boolean = false;
  // Add Form
  inputFields = [
    {
      type: 'text',
      fields: {
        label: 'Name',
        name: 'name',
        placeholder: 'Enter Product Name',
        required: true,
      },
    },
    {
      type: 'text',
      fields: {
        label: 'Category',
        name: 'category',
        placeholder: 'Enter Product Category',
        required: true,
      },
    },
    {
      type: 'number',
      fields: {
        label: 'Rating',
        name: 'rating',
        placeholder: 'Enter Product Rating',
        required: true,
      },
    },
    {
      type: 'number',
      fields: {
        label: 'Available Stock',
        name: 'available',
        placeholder: 'Enter Stock Quantity',
        required: true,
      },
    },
    {
      type: 'textarea',
      fields: {
        label: 'Description',
        name: 'description',
        placeholder: 'Enter Product Description',
        required: true,
      },
    },
    {
      type: 'file',
      fields: {
        label: 'Product Image',
        name: 'images',
        required: true,
      },
    },
  ];
  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.api.getProducts().subscribe((res: any) => {
      this.productData = res.products;
      console.log(res);
      this.loading = false;
    });
  }

  showDialog(visible: any) {
    this.visible = visible;
  }

  deleteProduct(id: any) {
    this.api.deleteProduct(id).subscribe((res: any) => {
      console.log(res);
      this.getProducts();
    });
  }

  onSubmitAddForm(formData: any) {
    this.api.createProduct(formData).subscribe((res: any) => {
      console.log(res);
      this.getProducts();
    });
    console.log(formData);
  }

  confirm2(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this product?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Product deleted',
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
        });
      },
    });
  }
}
