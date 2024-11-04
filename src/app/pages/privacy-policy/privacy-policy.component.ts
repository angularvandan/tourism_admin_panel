import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ApiService } from '../../services/api/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PanelModule } from 'primeng/panel';
import { CustomFormCompomemt } from '../../components/customForm/customform.component';
import { CustomTableComponent } from '../../components/customTable/customtable.component';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  providers: [MessageService, ConfirmationService],
  imports: [
    PanelModule,
    CustomTableComponent,
    DialogModule,
    CustomFormCompomemt,
    CommonModule,
    FormsModule,
    InputTextareaModule,
    ButtonModule,
  ],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.css'
})
export class PrivacyPolicyComponentimplements implements OnInit {
  constructor(
    private api: ApiService,
    private messageServies: MessageService,
    private confirmationService: ConfirmationService
  ) { }
  columns = [
    
    { field: 'privacyContent', header: 'Description' },
    
  ];
  columnsDetails=[
    { field: 'privacyContent', header: 'Description' },

  ];
  rowDetailsHeader:string='Privacy Policy Details';
  paginator = true;
  rowsPerPageOptions = [5, 10, 15];
  initialRowsPerPage = 5;
  loading: boolean = true;
  privacyPolicyData: any[] = [];
  visible: boolean = false;
  header:string="Add Privacy Policy";
  policy_id!:any;
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
      type: 'textarea',
      fields: {
        label: 'Content',
        name: 'privacyContent',
        placeholder: 'Enter Privacy Content',
        required: true,
        value:null

      },
    }
  ];

  ngOnInit(): void {
    this.getPrivacyDetails();
  }

  getPrivacyDetails() {
    this.api.getPrivacyPolicy().subscribe((res: any) => {
      this.privacyPolicyData = res;
      console.log(res);
      this.loading = false;
    });
  }

  showDialog(visible: any) {
    this.header="Add Privacy Policy";
    this.visible = visible;
    
    this.preFilledData={};
  }

  updateData(data:any){
    console.log(data);

    this.showDialog(true);

    this.policy_id=data._id;
    
    this.preFilledData=data;
    console.log(this.preFilledData);
    
    this.header="Update Privacy Policy";
  }

  deleteData(id: any) {
    console.log(id);
    this.api.deletePrivacyPolicy(id).subscribe((res: any) => {
      console.log(res);
      this.getPrivacyDetails();
      this.deleteMessage="Privacy Policy Deleted Successfully"

    });
  }
  
  // create tours 
  onSubmitAddForm(formData: any) {
    
    console.log(formData);
    formData={...formData};
    console.log(formData);

    this.api.createPrivacyPolicy(formData).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.getPrivacyDetails();
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }
  // update tours 
  onSubmitUpdateForm(formData: any) {
    
    console.log(formData);

    this.api.updatePrivacyPolicy(formData,this.policy_id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.message='Privacy Updated Successfully!'
        this.getPrivacyDetails();
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
