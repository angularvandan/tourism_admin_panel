import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ConfirmationService,
  MessageService,
  ConfirmEventType,
} from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { Table } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { info, success } from '../../utils/customtoast';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { CarouselModule } from 'primeng/carousel';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-custom-table',
  standalone: true,
  templateUrl: './customtable.component.html',
  imports: [
    TableModule,
    ButtonModule,
    InputTextModule,
    CommonModule,
    FormsModule,
    ToastModule,
    ConfirmDialogModule,
    DialogModule,
    CarouselModule,
  ],
  providers: [MessageService, ConfirmationService],
})
export class CustomTableComponent implements OnInit {
  @Input() columns?: any[];
  @Input() columnsDetails?: any[];
  @Input() rowDetailsHeader?: any;
  @Input() filterColumns?: any[];
  @Input() tableData?: any;
  @Input() deleteMessage: string = '';

  @Input() paginator?: boolean;
  @Input() loading?: boolean;
  @Input() editingStatus!: any;
  @Input() rowsPerPageOptions?: any[];
  @Input() initialRowsPerPage?: number;
  @Output() deleteData: EventEmitter<any> = new EventEmitter();
  @Output() updateData: EventEmitter<any> = new EventEmitter();
  @Output() visible: EventEmitter<any> = new EventEmitter();
  @ViewChild('dt') dt: Table | undefined;
  clonedData: { [s: string]: any } = {};

  displayDialog: boolean = false;
  selectedRow: any;
  selectedRowIndex: number = -1;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private api: ApiService
  ) { }
  //  Detect changes in input properties
  ngOnChanges(changes: SimpleChanges): void {

    if (changes['deleteMessage'] && changes['deleteMessage'].currentValue) {
      console.log(changes['deleteMessage'].currentValue);
      this.messageService.add(info(this.deleteMessage));
    }

  }

  exportCSVWithAllColumns() {
    // Step 1: Create a new array containing the data for all columns
    const allColumnsData = this.tableData.map((row: any) => {
      const rowData: any = {};

      if (this.columns) {
        // Loop through the columns property to fetch all column data
        this.columns.forEach(column => {
          rowData[column.field] = row[column.field] || ''; // Use empty string if value is missing
        });
      }
      // Step 1: Flatten data

      // Get the first image URL, if available
      rowData.image_url = row.images && row.images.length > 0 ? row.images[0] : '';

      // Extract fields from the nested `tour_id` object
      if (row.tour_id) {
        rowData.tour_id = row.tour_id._id;
        rowData.tour_name = row.tour_id.name;
        rowData.tour_title = row.tour_id.title;
        rowData.tour_description = row.tour_id.description;
        rowData.tour_address = row.tour_id.address;
        
        delete row.tour_id
      }

      // Flatten each `tip` in the `tips` array (up to 4 tips)
      row.tips.forEach((tip:any, index:any) => {
        rowData[`tip_${index + 1}_title`] = tip.title || '';
        rowData[`tip_${index + 1}_desc`] = tip.desc || '';
        rowData[`tip_${index + 1}_icon`] = tip.icon || '';
      });
      delete row.tips

      return rowData;
    });

    if (this.dt) {
      // Step 2: Temporarily set `dt.value` to the modified data
      const originalValue = this.dt.value;
      this.dt.value = allColumnsData;

      console.log(allColumnsData);
      console.log(this.columns);
      console.log(this.tableData);
      console.log(this.dt.value);

      // Step 3: Export to CSV
      this.dt.exportCSV();

      // Step 4: Restore the original data
      this.dt.value = originalValue;
    }
  }

  // Filter Global Table
  applyFilterGlobal($event: Event, stringVal: string) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  // On Edit Click
  onRowEditInit(rowData: any) {
    this.clonedData[rowData._id as string] = { ...rowData };
    console.log(this.clonedData);
    this.updateData.emit({ ...rowData });
    this.api.setUpdateAction();
    delete this.clonedData[rowData.id as string];

  }

  // On Edit Cancel
  onRowEditCancel(rowData: any, index: number) {
    this.tableData[index] = this.clonedData[rowData.id as string];
    delete this.clonedData[rowData.id as string];
  }

  // On Edit Save
  onRowEditSave(rowData: any) {
    delete this.clonedData[rowData.id as string];
    this.messageService.add(success('Updated Successfully'));
  }

  //On Row Delete
  onRowDelete(event: Event, rowData: any) {

    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi ',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        // this.messageService.add({
        //   severity: 'info',
        //   summary: 'Confirmed',
        //   detail: this.deleteMessage,
        // });
        this.deleteData.emit(rowData._id);
      },
      reject: () => {
        // this.messageService.add({
        //   severity: 'error',
        //   summary: 'Rejected',
        //   detail: 'You have rejected',
        // });
      },
    });
  }

  //Add User
  onAdd() {
    this.visible.emit(true);
    this.api.setAddAction();

  }

  // View Row Details
  onRowView(rowData: any, index: number) {
    this.selectedRow = rowData;
    console.log(this.selectedRow);
    this.selectedRowIndex = index;
    this.displayDialog = true;
  }

  ngOnInit(): void { }
}
