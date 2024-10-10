import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ApiService } from '../../services/api/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { CustomFormCompomemt } from '../../components/customForm/customform.component';
import { CustomTableComponent } from '../../components/customTable/customtable.component';

@Component({
  selector: 'app-activity-management',
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
  templateUrl: './activity-management.component.html',
  styleUrl: './activity-management.component.css'
})
export class ActivityManagementComponent implements OnInit{

  constructor(
    private api: ApiService,
    private messageServies: MessageService,
    private confirmationService: ConfirmationService
  ) { }
  columns = [
    { field: '_id', header: 'Id' },
    { field: 'spot_id', header: 'Spot Id' },    
    { field: 'name', header: 'Name' },
    { field: 'description', header: 'Description' },
    { field: 'image', header: 'Image' },
    { field: 'price_adult', header: 'Price (Adult)' },
    { field: 'price_child', header: 'Price (Child)' },
    { field: 'price_infant', header: 'Price (Infant)' },
  ];
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
        label: 'Spots Id',
        name: 'spot_id',
        placeholder: 'Enter Tours Id',
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
      type: 'textarea',
      fields: {
        label: 'Description',
        name: 'description',
        placeholder: 'Enter Description',
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
    },{
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
        name: 'image',
        required: true,
      },
    },
  ];
  

  selectedFileData:File[]=[];
  imageUrl:any='';


  ngOnInit(): void {
    this.getActivities();
  }

  getActivities() {
    this.api.getActivities().subscribe((res: any) => {
      this.toursData = res;
      console.log(res);
      this.loading = false;
    });
  }

  showDialog(visible: any) {
    this.visible = visible;
  }

  deleteData(id: any) {
    console.log(id);
    this.api.deleteActivityById(id).subscribe((res: any) => {
      console.log(res);
      this.getActivities();
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
        this.imageUrl=res.data[0];
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }
  // create tours 
  onSubmitAddForm(formData: any) {
    
    console.log(formData);
    formData={...formData,image:this.imageUrl};
    console.log(formData);

    this.api.createActivities(formData).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.getActivities();
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
