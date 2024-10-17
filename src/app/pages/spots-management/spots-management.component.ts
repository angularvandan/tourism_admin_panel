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
  selector: 'app-spots-management',
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
  templateUrl: './spots-management.component.html',
  styleUrl: './spots-management.component.css'
})
export class SpotsManagementComponent implements OnInit {

  constructor(
    private api: ApiService,
    private messageServies: MessageService,
    private confirmationService: ConfirmationService
  ) { }
  columns = [
    { field: 'name', header: 'Name' },
    { field: 'images', header: 'Images' },
    { field: 'price_adult', header: 'Price (Adult)' },
    { field: 'price_child', header: 'Price (Child)' },
    { field: 'price_infant', header: 'Price (Infant)' },
    { field: 'tips', header: 'Tips' },
  ];
  columnsDetails = [
    { field: 'name', header: 'Name' },
    { field: 'images', header: 'Images' },
    { field: 'price_adult', header: 'Price (Adult)' },
    { field: 'price_child', header: 'Price (Child)' },
    { field: 'price_infant', header: 'Price (Infant)' },
  ];
  rowDetailsHeader: string = 'Spot Details';

  paginator = true;
  rowsPerPageOptions = [5, 10, 15];
  initialRowsPerPage = 5;
  loading: boolean = true;
  toursData: any[] = [];
  visible: boolean = false;

  inputFields = [
    
    {
      type: 'select',
      fields: {
        label: 'Tours',
        name: 'tour_id',
        placeholder: 'Enter Tours Id',
        options: [ ],
        required: true,
      },
    },
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
        label: 'Price Adult',
        name: 'price_adult',
        placeholder: 'Enter price',
        required: true,
      },
    },
    {
      type: 'text',
      fields: {
        label: 'Price Child',
        name: 'price_child',
        placeholder: 'Enter price',
        required: true,
      },
    }, {
      type: 'text',
      fields: {
        label: 'Price Infant',
        name: 'price_infant',
        placeholder: 'Enter price',
        required: true,
      },
    },

    {
      type: 'file',
      fields: {
        label: 'Choose Image',
        name: 'images',
        required: true,
      },
    },
  ];
  dynamicForms: {
    title: string,
    desc: string,
    icon: string
  }[] = [
      {
        title: '',
        desc: '',
        icon: '',
      }
    ];

  selectedFileData: File[] = [];
  imageUrl: any[] = [];

  // Add new form when user clicks "Add Form"
  addNewForm() {
    this.dynamicForms.push({
      title: '',
      desc: '',
      icon: ''
    });
  }
  removeForm() {
    this.dynamicForms.pop();
  }


  ngOnInit(): void {
    this.getSpots();
    this.getAllTours();
  }

  getSpots() {
    this.api.getSpots().subscribe((res: any) => {
      this.toursData = res;
      console.log(res);
      this.loading = false;
    });
  }
  getAllTours() {
    this.api.getTours().subscribe({
      next: (res: any) => {
        console.log(res);
        const filteredData=res.tours;
        // select options
        this.inputFields.forEach(field => {
          if (field.type === 'select') {
            // Map filteredData to an array of objects with 'value' and 'label'
            field.fields.options = filteredData.map((item:any) => ({
              code: item._id,   // The value will be the _id
              name: item.name   // The label will be the name
            }));
          }
        });
        console.log(this.inputFields);
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  showDialog(visible: any) {
    this.visible = visible;
  }

  deleteData(id: any) {
    console.log(id);
    this.api.deleteSpot(id).subscribe((res: any) => {
      console.log(res);
      this.getSpots();
    });
  }
  //this is for file into url
  onFileSelect(data: any) {
    console.log(data);
    this.selectedFileData = data;

    const formData = new FormData();
    // Append each selected file to the FormData object
    this.selectedFileData.forEach(file => {
      formData.append('images', file);
    });

    this.api.getImageUrl(formData).subscribe({
      next: (res: any) => {
        console.log(res);
        this.imageUrl = res.data;
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
  // create tours 
  onSubmitAddForm(formData: any) {

    console.log(formData);
    console.log(this.dynamicForms);
    //code for drop down
    formData = { ...formData,tour_id:formData.tour_id.code, tips: this.dynamicForms, images: this.imageUrl };
    console.log(formData);

    this.api.createSpots(formData).subscribe({
      next: (res: any) => {
        console.log(res);
        this.getSpots();
      },
      error: (err: any) => {
        console.log(err);
      }
    });

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
