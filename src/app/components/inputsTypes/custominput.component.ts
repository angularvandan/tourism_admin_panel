import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
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

@Component({
  selector: 'app-custom-input',
  standalone: true,
  template: `
    <p-panel [header]="title">
      <div class="p-6">
      <form (ngSubmit)="submitForm()" [formGroup]="formData">
  <!-- Your form fields here -->
  <div *ngFor="let field of inputFields">
    <div class="form-group">
      <label for="{{ field.fields.name }}" class="block font-medium">{{ field.fields.label }}</label>
      <ng-container [ngSwitch]="field.type">
        <!-- Text Input -->
        <ng-container *ngSwitchCase="'text'">
          <input type="text" [formControlName]="field.fields.name" class="form-control" [placeholder]="field.fields.placeholder" />
        </ng-container>
        <!-- Number Input -->
        <ng-container *ngSwitchCase="'number'">
          <input type="number" [formControlName]="field.fields.name" class="form-control" [placeholder]="field.fields.placeholder" />
        </ng-container>
        <!-- Checkbox -->
        <ng-container *ngSwitchCase="'check'">
          <p-checkbox [binary]="true" [formControlName]="field.fields.name">{{ field.fields.checklabel }}</p-checkbox>
        </ng-container>
        <!-- Radio Buttons -->
        <ng-container *ngSwitchCase="'radio'">
          <div *ngFor="let option of field.fields.options">
            <p-radioButton [name]="field.fields.name" [value]="option.value" [formControlName]="field.fields.name">{{ option.label }}</p-radioButton>
          </div>
        </ng-container>
        <!-- Select Input -->
        <ng-container *ngSwitchCase="'select'">
          <p-dropdown [options]="field.fields.options" [formControlName]="field.fields.name" [placeholder]="field.fields.placeholder"></p-dropdown>
        </ng-container>
      </ng-container>
    </div>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>

      </div>
    </p-panel>
    <p-toast position="bottom-center"></p-toast>
  `,
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
    ReactiveFormsModule
  ],
  providers: [MessageService],
})
export class CustomInputComponent {
  @Input() title: string = '';
  @Input() inputFields: any[] = [];
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();

  formData: FormGroup;

  constructor(private messageService: MessageService, private formBuilder: FormBuilder) {
    this.formData = this.formBuilder.group({});
  }

  createForm() {
    const formGroup: { [key: string]: any } = {};
    this.inputFields.forEach((field) => {
      let validators = [];
      if (field.fields.required) {
        validators.push(Validators.required);
      }

      formGroup[field.fields.name] = [null, validators];
    });

    this.formData = this.formBuilder.group(formGroup);
  }

  submitForm() {
    // Check if the form is valid
    if (this.formData.invalid) {
      // Mark all fields as touched to display validation messages
      Object.values(this.formData.controls).forEach(control => {
        control.markAsTouched();
      });
      // Return early if the form is invalid
      return;
    }

    // Form is valid, emit the form data
    this.formSubmit.emit(this.formData.value);
    console.log(this.formData.value);

    // Reset the form
    this.formData.reset();

    // Display toast message for successful submission
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Form submitted successfully!',
    });
  }
}
