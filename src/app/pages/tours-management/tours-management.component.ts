import { CommonModule } from '@angular/common';
import { Component, OnChanges, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { PanelModule } from 'primeng/panel';
import { CustomFormCompomemt } from '../../components/customForm/customform.component';
import { CustomTableComponent } from '../../components/customTable/customtable.component';
import { ApiService } from '../../services/api/api.service';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-tours-management',
  standalone: true,
  templateUrl: './tours-management.component.html',
  styleUrl: './tours-management.component.css',
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
    InputTextareaModule,
    ButtonModule,
    ToastModule
  ],
})
export class ToursManagementComponent implements OnInit {
  constructor(
    private api: ApiService,
    private messageServies: MessageService,
    private confirmationService: ConfirmationService
  ) { }
  columns = [
    { field: 'name', header: 'Name' },
    { field: 'title', header: 'Headline' },
    { field: 'description', header: 'Description' },
    { field: 'address', header: 'Address' },
    { field: 'images', header: 'Images' },
    { field: 'price_adult', header: 'Price (Adult)' },
    { field: 'price_child', header: 'Price (Child)' },
    { field: 'price_infant', header: 'Price (Infant)' },
    { field: 'tips', header: 'Tips' },
  ];
  columnsDetails = [
    { field: 'name', header: 'Name' },
    { field: 'title', header: 'Headline' },
    { field: 'address', header: 'Address' },
    { field: 'images', header: 'Images' },
    { field: 'price_adult', header: 'Price (Adult)' },
    { field: 'price_child', header: 'Price (Child)' },
    { field: 'price_infant', header: 'Price (Infant)' },
  ];
  rowDetailsHeader: string = 'Tour Details';
  paginator = true;
  rowsPerPageOptions = [5, 10, 15];
  initialRowsPerPage = 5;
  loading: boolean = true;
  toursData: any[] = [];
  visible: boolean = false;
  header: string = "Add Tour";
  tours_id!: any;
  preFilledData!: any;
  message: string = '';
  deleteMessage = '';

  actionButtonStatus = {
    view: true,
    edit: true,
    delete: true,
    add: true
  }

  inputFields = [
    {
      type: 'text',
      fields: {
        label: 'Name',
        name: 'name',
        placeholder: 'Enter Name',
        required: true,
        value: null
      },
    },
    {
      type: 'text',
      fields: {
        label: 'Title',
        name: 'title',
        placeholder: 'Enter Title',
        required: true,
        value: null

      },
    },
    {
      type: 'number',
      fields: {
        label: 'Price Adult',
        name: 'price_adult',
        placeholder: 'Enter price',
        required: true,
        value: null

      },
    },
    {
      type: 'number',
      fields: {
        label: 'Price Child',
        name: 'price_child',
        placeholder: 'Enter price',
        required: true,
        value: null

      },
    },
    {
      type: 'number',
      fields: {
        label: 'Price Infant',
        name: 'price_infant',
        placeholder: 'Enter price',
        required: true,
        value: null

      },
    },
    {
      type: 'text',
      fields: {
        label: 'Address',
        name: 'address',
        placeholder: 'Enter address',
        required: true,
        value: null

      },
    },
    {
      type: 'textarea',
      fields: {
        label: 'Description',
        name: 'description',
        placeholder: 'Enter Description',
        required: true,
        value: null

      },
    },
    {
      type: 'file',
      fields: {
        label: 'Choose Image',
        warn: 'Select only two images (1400 * 850)',
        name: 'images',
        required: true,
        value: null

      },
    },
  ];
  dynamicForms: {
    title: string,
    desc1: string,
    desc2: string
  }[] = [
      {
        title: '',
        desc1: '',
        desc2: '',
      }
    ];

  selectedFileData: File[] = [];
  imageUrl: any[] = [];

  // Add new form when user clicks "Add Form"
  addNewForm() {
    if (this.dynamicForms.length < 4) {
      this.dynamicForms.push({
        title: '',
        desc1: '',
        desc2: '',
      });
    }

  }
  removeForm() {
    this.dynamicForms.pop();
  }


  ngOnInit(): void {
    this.getTours();
  }

  getTours() {
    this.api.getTours().subscribe((res: any) => {
      this.toursData = res.tours;
      console.log(res);
      this.loading = false;
    });
  }

  showDialog(visible: any) {
    this.header = "Add Tour";
    this.visible = visible;

    this.preFilledData = {};
    this.dynamicForms = [];
    this.addNewForm();
  }

  updateData(data: any) {
    console.log(data);

    this.showDialog(true);

    this.tours_id = data._id;

    this.preFilledData = data;
    this.dynamicForms = data.tips;
    console.log(this.preFilledData);

    this.header = "Update Tour";
  }

  deleteData(id: any) {
    console.log(id);
    this.api.deleteTour(id).subscribe((res: any) => {
      console.log(res);
      this.getTours();
      this.deleteMessage = "Tour Deleted Successfully"
    });
  }
  //this is for file into url
  onFileSelect(data: any) {
    console.log(data);
    this.selectedFileData = data.slice(0, 2);
    if(this.selectedFileData.length!=2){
      this.messageServies.add({ severity: 'error', summary: 'Error', detail: 'Select two images!'});
      return;
    }

    const formData = new FormData();
    // Append each selected file to the FormData object
    this.selectedFileData.forEach(file => {
      formData.append('images', file);
    });

    this.api.getImageUrl(formData).subscribe({
      next: (res: any) => {
        console.log(res);
        this.imageUrl = res.data;
        this.preFilledData = { ...this.preFilledData, images: this.imageUrl };
        console.log(this.preFilledData);
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
    formData = { ...formData, tips: this.dynamicForms, images: this.imageUrl };
    console.log(formData);

    this.api.createTours(formData).subscribe({
      next: (res: any) => {
        console.log(res);
        this.getTours();
        this.message = 'Tour Added Successfully';
        // Reset `message` to allow for the same message again later
        setTimeout(() => {
          this.message = ''; // Clears message without triggering additional toast

        }, 0);
        setTimeout(() => {
          this.showDialog(false);
        }, 1500);
      },
      error: (err: any) => {
        console.log(err);
        this.messageServies.add({ severity: 'error', summary: 'Error', detail: err.error.message });
      }
    })

  }
  // update tours 
  onSubmitUpdateForm(formData: any) {

    console.log(formData);
    console.log(this.dynamicForms);
    formData = { ...formData, tips: this.dynamicForms };
    
    console.log(formData);

    this.api.updateTour(formData, this.tours_id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.message = 'Tour Updated Successfully!'
        this.getTours();
        // Reset `message` to allow for the same message again later
        setTimeout(() => {
          this.message = ''; // Clears message without triggering additional toast
        }, 0);
        setTimeout(() => {
          this.showDialog(false);
        }, 1500);
      },
      error: (err: any) => {
        console.log(err);
        this.messageServies.add({ severity: 'error', summary: 'Error', detail: err.error.message });
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
