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
    { field: 'quote', header: 'Quote' },
    { field: 'images', header: 'Images' },
    { field: 'content', header: 'Content' },
    
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

  header:string="Add Blog";
  preFilledData!:any;
  blog_id!:any;
  message:string='';
  deleteMessage:string='';

  actionButtonStatus={
    view:true,
    edit:true,
    delete:true,
    add:true

  }

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
      type: 'text',
      fields: {
        label: 'Quote Content',
        name: 'quote_content',
        placeholder: 'Enter Quote',
        required: true,
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
      type: 'file',
      fields: {
        label: 'Choose Image',
        name: 'images',
        required: true,
        warn:'Select only two images (1100 * 600).'
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
    if(this.dynamicForms.length<4){
      this.dynamicForms.push({
        desc:''
      });
    }
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
  updateData(data:any){
    console.log(data);

    this.showDialog(true);
    this.preFilledData={...data,name:data.quote.name,quote_content:data.quote.content};
    this.dynamicForms=data.content;
    this.blog_id=data._id;
    console.log(this.preFilledData);
    
    this.header="Update Blog";
  }
  // update tours 
  onSubmitUpdateForm(formData: any) {
    
    console.log(formData);
    console.log(this.dynamicForms);
    formData={...formData,content:this.dynamicForms,quote:{content:formData.quote_content,name:formData.name}};
    console.log(formData);

    this.api.updateBlog(formData,this.blog_id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.getBlogs();
        this.message='Blog Updated Successfully!'
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
    this.api.deleteBlogById(id).subscribe((res: any) => {
      console.log(res);
      this.getBlogs();
      this.deleteMessage='Blog Deleted Successfully';
      // Reset `message` to allow for the same message again later
      setTimeout(() => {
        this.deleteMessage = ''; // Clears message without triggering additional toast
      }, 0);
    });
  }
  //this is for file into url
  onFileSelect(data:any){
    console.log(data);
    this.selectedFileData = data.slice(0, 2);

    const formData = new FormData();
      // Append each selected file to the FormData object
      this.selectedFileData.forEach(file => {
        formData.append('images', file);
      });

    this.api.getImageUrl(formData).subscribe({

      next:(res:any)=>{
        console.log(res);
        this.imageUrl=res.data;
        this.preFilledData={...this.preFilledData,images:this.imageUrl};
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
    console.log(this.dynamicForms);
    formData={...formData,content:this.dynamicForms,images:this.imageUrl,quote:{content:formData.quote_content,name:formData.name}};

    delete formData.quote_content;
    delete formData.name;

    console.log(formData);

    this.api.createBlogs(formData).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.getBlogs();
        this.message='Blog Added Successfully!';
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

  // confirm2(event: Event) {
  //   this.confirmationService.confirm({
  //     target: event.target as EventTarget,
  //     message: 'Do you want to delete this record?',
  //     header: 'Delete Confirmation',
  //     icon: 'pi pi-info-circle',
  //     acceptButtonStyleClass: 'p-button-danger p-button-text',
  //     rejectButtonStyleClass: 'p-button-text p-button-text',
  //     acceptIcon: 'none',
  //     rejectIcon: 'none',

  //     accept: () => {
  //       this.messageServies.add({
  //         severity: 'info',
  //         summary: 'Confirmed',
  //         detail: 'Record deleted',
  //       });
  //     },
  //     reject: () => {
  //       this.messageServies.add({
  //         severity: 'error',
  //         summary: 'Rejected',
  //         detail: 'You have rejected',
  //       });
  //     },
  //   });
  // }
}
