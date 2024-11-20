import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ApiService } from '../../services/api/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PanelModule } from 'primeng/panel';
import { CustomFormCompomemt } from '../../components/customForm/customform.component';
import { CustomTableComponent } from '../../components/customTable/customtable.component';

@Component({
  selector: 'app-home-banner',
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
    InputTextareaModule,
    ButtonModule,
  ], templateUrl: './home-banner.component.html',
  styleUrl: './home-banner.component.css'
})
export class HomeBannerComponent implements OnInit {
  constructor(
    private api: ApiService,
    private messageServies: MessageService,
    private confirmationService: ConfirmationService
  ) { }
  columns = [
    { field: 'name', header: 'Name' },
    { field: 'title', header: 'Title' },
    { field: 'subtitle', header: 'Sub Title' },
    { field: 'image', header: 'Image' },

  ];
  columnsDetails = [
    { field: 'name', header: 'Name' },
    { field: 'title', header: 'Title' },
    { field: 'subtitle', header: 'Sub Title' },
    { field: 'image', header: 'Image' },
  ];
  rowDetailsHeader: string = 'Home Banner Details';
  paginator = true;
  rowsPerPageOptions = [5, 10, 15];
  initialRowsPerPage = 5;
  loading: boolean = true;
  homeBannerData: any[] = [];
  visible: boolean = false;
  header: string = "Add Home Banner";
  homeBanner_id!: any;
  preFilledData!: any;
  message: string = '';
  deleteMessage='';

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
      type: 'text',
      fields: {
        label: 'Sub Title',
        name: 'subtitle',
        placeholder: 'Enter Title',
        required: true,
        value: null

      },
    },
    {
      type: 'file',
      fields: {
        label: 'Choose Image',
        warn: 'Select only one image (1400 * 850)',
        name: 'image',
        required: true,
        value: null

      },
    },

  ];
  selectedFileData: File[] = [];
  imageUrl: any[] = [];


  ngOnInit(): void {
    this.getHomeBanner();
  }

  getHomeBanner() {
    this.api.getHomeBanner().subscribe((res: any) => {
      this.homeBannerData = res;
      console.log(res);
      this.loading = false;
    });
  }

  showDialog(visible: any) {
    this.header = "Add Home Banner";
    this.visible = visible;

    this.preFilledData = {};

  }

  updateData(data: any) {
    console.log(data);

    this.showDialog(true);

    this.homeBanner_id = data._id;

    this.preFilledData = data;
    console.log(this.preFilledData);

    this.header = "Update Home Banner";
  }

  deleteData(id: any) {
    console.log(id);
    this.api.deleteHomeBanner(id).subscribe((res: any) => {
      console.log(res);
      this.getHomeBanner();
      this.deleteMessage="Home Banner Deleted  Succssfully"
    });
  }
  //this is for file into url
  onFileSelect(data: any) {
    console.log(data);
    this.selectedFileData = data.slice(0, 1);

    const formData = new FormData();
    // Append each selected file to the FormData object
    this.selectedFileData.forEach(file => {
      formData.append('images', file);
    });

    this.api.getImageUrl(formData).subscribe({
      next: (res: any) => {
        console.log(res);
        this.imageUrl = res.data[0];
        this.preFilledData = { ...this.preFilledData, image: this.imageUrl };
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
    formData = { ...formData, image: this.imageUrl };
    console.log(formData);

    this.api.createHomeBanner(formData).subscribe({
      next: (res: any) => {
        console.log(res);
        this.getHomeBanner();
        this.message="Home Created Successfully!"
        setTimeout(() => {
          this.message = ''; // Clears message without triggering additional toast
        }, 0);
        setTimeout(() => {
          this.showDialog(false);
        }, 1500);
      },
      error: (err: any) => {
        console.log(err);
      }
    })

  }
  // update tours 
  onSubmitUpdateForm(formData: any) {

    console.log(formData);
    formData = { ...formData };
    console.log(formData);

    this.api.updateHomeBanner(formData, this.homeBanner_id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.message = 'Home Updated Successfully!'
        this.getHomeBanner();
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
