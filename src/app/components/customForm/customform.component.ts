import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit, ViewChild, ElementRef, SimpleChanges, OnChanges } from '@angular/core';
import { FormsModule, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { success } from '../../utils/customtoast';
import { FileUploadModule } from 'primeng/fileupload';
import { FileUploadComponent } from '../fileUpload/fileupload.component';
import { ApiService } from '../../services/api/api.service';
@Component({
  selector: 'app-custom-form',
  standalone: true,
  templateUrl: './customform.component.html',
  styles: ` `,
  imports: [
    FormsModule,
    CommonModule,
    RadioButtonModule,
    DropdownModule,
    CheckboxModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    PanelModule,
    CardModule,
    ToastModule,
    MultiSelectModule,
    InputTextareaModule,
    ReactiveFormsModule,
    CalendarModule,
    FileUploadModule,
    FileUploadComponent
  ],
  providers: [MessageService],
})
export class CustomFormCompomemt implements OnInit {
  @Input() title: string = '';
  @Input() dynamicForms: any[] = [];
  @Input() inputFields: any[] = [];
  @Input() patchData: any = {};  // Add this to receive patch data
  @Input() message:string='';
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() formUpdate: EventEmitter<any> = new EventEmitter<any>();
  @Output() file: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('fileInput')
  fileInput!: ElementRef;
  formData = this.fb.group({});
  uploadedFiles: any[] = [];

  imagePreviews:any[]=[];
  imagesLinksContainer:any[]=[];
  buttonStatus!:any;

  constructor(private messageService: MessageService, private fb: FormBuilder,private api:ApiService) {
  }

  ngOnInit(): void {
    this.createForm();
    // Subscribe to the form action observable
    this.api.formAction$.subscribe(action => {
      this.buttonStatus = action;
    });
  }
  // Detect changes in input properties
  ngOnChanges(changes: SimpleChanges): void {
    // If patchData input changes, patch the form with the new data
    if (changes['patchData'] && this.formData && Object.keys(this.patchData).length != 0) {
      console.log(this.patchData);
      this.formData.patchValue(this.patchData);  // Patch the form with the incoming data
      console.log(this.formData.value);
    }else{
      this.formData.reset();
      this.createForm();
      console.log('hi');
    }
    if(changes['message'] && changes['message'].currentValue){
      console.log(changes['message'].currentValue)
      this.messageService.add(success(this.message));
    }

  }

  createForm() {
    console.log('hi');
    for (let controls of this.inputFields) {
      const validators = []
      if (controls.fields.required) {
        validators.push(Validators.required)
      }
      if (controls.type === 'text') {
        validators.push(Validators.pattern('^[^0-9]+$'));  // Regex for only alphabets
      }
      // console.log(validators)
      this.formData.addControl(controls.fields.name, this.fb.control(controls.value, validators))
      console.log(this.formData)
    }
  }

  submitForm() {
    // Send Form Data
    this.formSubmit.emit(this.formData.value);
    console.log(this.formData);
    // Reset Form
    this.formData.reset();
    // Display toast message
  }

  updateForm() {
    this.formUpdate.emit(this.formData.value);
    console.log(this.formData);
    this.formData.reset();
    console.log(this.title);
  }

  // When the user selects files
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      // this is for hide update button when user enter other image 
      if(this.formData.get('images')){

        this.formData.patchValue({
          images:null
        })
      }
      else{
        this.formData.patchValue({
          image:null
        })
      }
      // Store selected files
      let selectedFiles = Array.from(input.files);
      this.file.emit(selectedFiles);
    }
  }

}
