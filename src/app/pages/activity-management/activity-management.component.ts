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
    { field: 'name', header: 'Name' },
    { field: 'spot_id', header:'Spot Details'},
    { field: 'price_adult', header: 'Price (Adult)' },
    { field: 'price_child', header: 'Price (Child)' },
    { field: 'image', header: 'Image' },
    { field: 'price_infant', header: 'Price (Infant)' },
    { field: 'description', header: 'Description' },
  ];
  columnsDetails=[
    { field: 'name', header: 'Name' },
    { field: 'image', header: 'Image' },
    { field: 'price_adult', header: 'Price (Adult)' },
    { field: 'price_child', header: 'Price (Child)' },
    { field: 'price_infant', header: 'Price (Infant)' },
  ];
  rowDetailsHeader:string='Activity Details';
  paginator = true;
  rowsPerPageOptions = [5, 10, 15];
  initialRowsPerPage = 5;
  loading: boolean = true;
  toursData: any[] = [];
  visible: boolean = false;

  header:string="Add Activity";
  spot_id!:any;
  preFilledData!:any;
  message:string='';
  deleteMessage='';

  actionButtonStatus={
    view:true,
    edit:true,
    delete:true,
    add:true
  }

  inputFields = [
    
    {
      type: 'select',
      fields: {
        label: 'Spots Id',
        name: 'spot_id',
        placeholder: 'Enter Spots Id',
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
      type: 'number',
      fields: {
        label: 'Price Adult',
        name: 'price_adult',
        placeholder: 'Enter price',
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
      type: 'number',
      fields: {
        label: 'Price Child',
        name: 'price_child',
        placeholder: 'Enter price',
        required: true,
      },
    },{
      type: 'number',
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
        warn:'Images ratio (1150x460).'
      },
    }
  ];

  selectedFileData:File[]=[];
  imageUrl:any='';


  ngOnInit(): void {
    this.getActivities();
    this.getAllSpots();
  }

  getActivities() {
    this.api.getActivities().subscribe((res: any) => {
      this.toursData = res;
      console.log(res);
      this.loading = false;
    });
  }
  getAllSpots() {
    this.api.getSpots().subscribe({
      next: (res: any) => {
        console.log(res);
        const filteredData=res;
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
    this.header="Add Activity";
    
    this.preFilledData={};
  }
  updateData(data:any){
    console.log(data);

    this.showDialog(true);

    this.spot_id=data._id;
    
    this.preFilledData={...data,spot_id:{name:data.spot_id.name,code:data.spot_id._id}};
    console.log(this.preFilledData);
    
    this.header="Update Activity";
  }

  // update tours 
  onSubmitUpdateForm(formData: any) {
    
    console.log(formData);
    formData={...formData,spot_id:formData.spot_id.code};
    console.log(formData);

    this.api.updateActivities(formData,this.spot_id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.getActivities();
        this.message="Activity Updated Successfully";
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

  deleteData(id: any) {
    console.log(id);
    this.api.deleteActivityById(id).subscribe((res: any) => {
      console.log(res);
      this.getActivities();
      this.deleteMessage="Activity Deleted Successfully"
    });
  }
  //this is for file into url
  onFileSelect(data:any){
    console.log(data);
    this.selectedFileData = data.slice(0, 1);

    const formData = new FormData();
      // Append each selected file to the FormData object
      this.selectedFileData.forEach(file => {
        formData.append('images', file);
      });

    this.api.getImageUrl(formData).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.imageUrl=res.data[0];
        this.preFilledData={...this.preFilledData,image:this.imageUrl};
        console.log(this.preFilledData);
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }
  // create tours 
  onSubmitAddForm(formData: any) {
    
    console.log(formData);
    formData={...formData,spot_id:formData.spot_id.code,image:this.imageUrl};
    console.log(formData);

    this.api.createActivities(formData).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.getActivities();
        this.message="Activity Added Successfully";
        // Reset `message` to allow for the same message again later
        setTimeout(() => {
          this.message = ''; // Clears message without triggering additional toast
        }, 0);
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
