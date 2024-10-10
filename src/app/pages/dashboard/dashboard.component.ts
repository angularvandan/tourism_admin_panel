import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { CustomFormCompomemt } from '../../components/customForm/customform.component';
import { CustomTableComponent } from '../../components/customTable/customtable.component';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  imports: [
    PanelModule,
    CardModule,
    CustomFormCompomemt,
    CustomTableComponent,
    CommonModule,
    RouterOutlet,
    RouterLink,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [MessageService]
})
export class DashboardComponent implements OnInit {
  // Example Table
  columns = [
    { field: 'name', header: ' Display Name' },
    { field: 'code', header: 'Display code' },
    { field: 'quantity', header: 'Display quantity' },
    { field: 'category', header: 'Display category' },
  ];
  filterColumns = ['name', 'code', 'quantity'];
  paginator = true;
  rowsPerPageOptions = [1, 2, 3];
  initialRowsPerPage = 1;
  tableData = [
    {
      id: '1000',
      code: 'f230fh0g3',
      name: 'name',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 2,
      inventoryStatus: 'INSTOCK',
      rating: 5,
    },
    {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Yash',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5,
    }
  ];
  // Forms Array Example
  onFormSubmit(formData: any) {
    console.log(formData)
  }
  inputFields = [
    {
      type: 'text',
      fields: {
        label: 'Name',
        name: 'name',
        placeholder: 'Enter Name',
        required: true,
      },
    },
    {
      type: 'text',
      fields: {
        label: 'Email',
        name: 'email',
        placeholder: 'Enter Email',
        required: false,
      },
    },
    {
      type: 'text',
      fields: {
        label: 'City',
        name: 'city',
        placeholder: 'Enter City',
        required: false,
      },
    },
    {
      type: 'text',
      fields: {
        label: 'Country',
        name: 'country',
        placeholder: 'Enter Country',
        required: false,
      },
    },
    {
      type: 'number',
      fields: {
        label: 'Price',
        name: 'price',
        placeholder: 'Enter Price',
        required: false,
      },
    },
    {
      type: 'select',
      fields: {
        label: 'State',
        name: 'state',
        placeholder: 'Select State',
        required: false,
        options: [
          'Maharashtra',
          'Maharashtra',
          'Maharashtra',
          'Maharashtra',
          'Maharashtra',
        ],
      },
    },
    {
      type: 'multipleSelect',
      fields: {
        label: 'Items',
        name: 'items',
        placeholder: 'Select Items',
        required: false,
        options: [
          { name: 'item1', code: 'M2' },
          { name: 'item2', code: 'M3' },
          { name: 'item3', code: 'M4' },
          { name: 'item4', code: 'M5' },
        ],
      },
    },
    {
      type: 'radio',
      fields: {
        label: 'Gender',
        name: 'Gender',
        required: false,
        options: [
          { label: 'Male', value: 'male' },
          { label: 'Female', value: 'female' },
        ],
      },
    },
    {
      type: 'textarea',
      fields: {
        label: 'Summary',
        name: 'summary',
        placeholder: 'Summary',
        required: true,
      },
    },
  ];

  ngOnInit(): void {
    const errorWithMessage = {
      response: {
        data: {
          error: {
            message: 'Error message from response'
          }
        }
      }
    };

  }

}
