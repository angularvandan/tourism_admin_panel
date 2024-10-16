import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
    { field: 'title', header: 'Title' },
    { field: 'description', header: 'Description' },
    { field: 'address', header: 'Address' },
    { field: 'images', header: 'Images' },
    { field: 'price_adult', header: 'Price (Adult)' },
    { field: 'price_child', header: 'Price (Child)' },
    { field: 'price_infant', header: 'Price (Infant)' },
    { field: 'tips', header: 'Tips' },
  ];
  columnsDetails=[
    { field: 'name', header: 'Name' },
    { field: 'title', header: 'Title' },
    { field: 'address', header: 'Address' },
    { field: 'images', header: 'Images' },
    { field: 'price_adult', header: 'Price (Adult)' },
    { field: 'price_child', header: 'Price (Child)' },
    { field: 'price_infant', header: 'Price (Infant)' },
  ];
  rowDetailsHeader:string='Tour Details';
  paginator = true;
  rowsPerPageOptions = [5, 10, 15];
  initialRowsPerPage = 5;
  loading: boolean = true;
  toursData: any[] = [];
  visible: boolean = false;

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
        label: 'Title',
        name: 'title',
        placeholder: 'Enter Title',
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
    },
    {
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
    {
      type: 'textarea',
      fields: {
        label: 'Description',
        name: 'description',
        placeholder: 'Enter Description',
        required: true,
      },
    },
    {
      type: 'textarea',
      fields: {
        label: 'Address',
        name: 'address',
        placeholder: 'Enter address',
        required: true,
      },
    },
  ];
  dynamicForms: { 
    title: string, 
    desc1: string, 
    icon1: string, 
    desc2: string, 
    icon2: string 
  }[] = [
    {
      title: '',
      desc1: '',
      icon1: '',
      desc2: '',
      icon2: ''
    }
  ];

  selectedFileData:File[]=[];
  imageUrl:any[]=[];

  // Add new form when user clicks "Add Form"
  addNewForm() {
    this.dynamicForms.push({
      title: '',
      desc1: '',
      icon1: '',
      desc2: '',
      icon2: ''
    });
  }
  removeForm(){
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
    this.visible = visible;
  }

  deleteData(id: any) {
    console.log(id);
    this.api.deleteTour(id).subscribe((res: any) => {
      console.log(res);
      this.getTours();
    });
  }
  //this is for file into url
  onFileSelect(data:any){
    console.log(data);
    this.selectedFileData=data;

    const formData = new FormData();
      // Append each selected file to the FormData object
      this.selectedFileData.forEach(file => {
        formData.append('images', file);
      });

    this.api.getImageUrl(formData).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.imageUrl=res.data;
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }
  // create tours 
  onSubmitAddForm(formData: any) {
    
    console.log(formData);
    console.log(this.dynamicForms);
    formData={...formData,tips:this.dynamicForms,images:this.imageUrl};
    console.log(formData);

    this.api.createTours(formData).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.getTours();
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
