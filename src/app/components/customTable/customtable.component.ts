import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
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
import { success } from '../../utils/customtoast';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { CarouselModule } from 'primeng/carousel';

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
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
  @Input() columns?: any[];
  @Input() columnsDetails?: any[];
  @Input() rowDetailsHeader?:any;
  @Input() filterColumns?: any[];
  @Input() tableData?: any;
  @Input() paginator?: boolean;
  @Input() loading?: boolean;
  @Input() editingStatus?: boolean=true;
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

  // Filter Global Table
  applyFilterGlobal($event: Event, stringVal: string) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  // On Edit Click
  onRowEditInit(rowData: any) {
    this.clonedData[rowData._id as string] = { ...rowData };
    console.log(this.clonedData);
    this.updateData.emit({...rowData});
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
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Record deleted',
        });
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
  }

  // View Row Details
  onRowView(rowData: any, index: number) {
    this.selectedRow = rowData;
    console.log(this.selectedRow);
    this.selectedRowIndex = index;
    this.displayDialog = true;
  }

  ngOnInit(): void {}
}
