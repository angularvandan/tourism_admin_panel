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
  selector: 'app-blog-management',
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
  templateUrl: './blog-management.component.html',
  styleUrl: './blog-management.component.css'
})
export class BlogManagementComponent implements OnInit{
  constructor(
    private api: ApiService,
    private messageServies: MessageService,
    private confirmationService: ConfirmationService
  ) { }
  columns = [
    { field: 'title', header: 'Title' },
    { field: 'images', header: 'Images' },
    { field: 'content', header: 'Content' },
    { field: 'quote', header: 'Quote' },
    
  ];
  columnsDetails=[
    { field: 'title', header: 'Title' },
    { field: 'images', header: 'Images' },
    { field: 'quote', header: 'Quote' },
  ]
  rowDetailsHeader:string="Bolg Details";
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
        label: 'Title',
        name: 'title',
        placeholder: 'Enter Title',
        required: true,
      },
    },
    
    {
      type: 'file',
      fields: {
        label: 'Choose Image',
        name: 'images',
        required: true,
        warn:'Select only two images.'
      },
    },
    {
      type: 'text',
      fields: {
        label: 'Quote Given by ',
        name: 'name',
        placeholder: 'Enter Name',
        required: true,
      },
    },
    {
      type: 'textarea',
      fields: {
        label: 'Quote Content',
        name: 'quote_content',
        placeholder: 'Enter Quote',
        required: true,
      },
    },

  ];
  dynamicForms: { 
    desc: string, 
    
  }[] = [
    {
      desc:''
    }
  ];

  selectedFileData:File[]=[];
  imageUrl:any[]=[];

  // Add new form when user clicks "Add Form"
  addNewForm() {
    this.dynamicForms.push({
      desc:''
    });
  }
  removeForm(){
    this.dynamicForms.pop();
  }


  ngOnInit(): void {
    this.getBlogs();
  }

  getBlogs() {
    this.api.getBlogs().subscribe((res: any) => {
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
    this.api.deleteBlogById(id).subscribe((res: any) => {
      console.log(res);
      this.getBlogs();
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
    formData={...formData,content:this.dynamicForms,images:this.imageUrl,quote:{content:formData.quote_content,name:formData.name}};

    delete formData.quote_content;
    delete formData.name;

    console.log(formData);

    this.api.createBlogs(formData).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.getBlogs();
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
