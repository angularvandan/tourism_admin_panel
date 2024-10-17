import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { CustomFormCompomemt } from '../../components/customForm/customform.component';
import { CustomTableComponent } from '../../components/customTable/customtable.component';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ApiService } from '../../services/api/api.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  imports: [
    PanelModule,
    CardModule,
    CustomFormCompomemt,
    CustomTableComponent,
    CommonModule,
    RouterOutlet,
    RouterLink,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [MessageService]
})
export class DashboardComponent implements OnInit {

  paginator = true;
  rowsPerPageOptions = [1, 2, 3];
  initialRowsPerPage = 1;

  allDetails={
    toursLength:0,
    spotsLength:0,
    activitiesLength:0,
    blogsLength:0,
    bookingLength:0,
    feedbackLength:0,
    contactLength:0
  }
  
  // Forms Array Example
  onFormSubmit(formData: any) {
    console.log(formData)
  }

  constructor(private api:ApiService){}

  ngOnInit(): void {
    this.getAllTours();
    this.getAllSpots();
    this.getAllActivities();
    this.getAllBookings();
    this.getAllBlogs();
    this.getAllFeedbacks();
    this.getAllContacts();
  }
  getAllTours() {
    this.api.getTours().subscribe({
      next:(res:any)=>{
        // console.log(res);
        this.allDetails.toursLength=res.tours.length;
      },error:(err:any)=>{
        console.log(err);
      }
    });
  }
  getAllSpots() {
    this.api.getSpots().subscribe({
      next:(res:any)=>{
        // console.log(res);
        this.allDetails.spotsLength=res.length;

      },error:(err:any)=>{
        console.log(err);
      }
    });
  }
  getAllActivities() {
    this.api.getActivities().subscribe({
      next:(res:any)=>{
        this.allDetails.activitiesLength=res.length;
      },error:(err:any)=>{
        console.log(err);
      }
    });
  }
  getAllBookings() {
    this.api.getBookings().subscribe({
      next:(res:any)=>{
        this.allDetails.bookingLength=res.length;

      },error:(err:any)=>{
        console.log(err);
      }
    });
  }
  getAllBlogs() {
    this.api.getBlogs().subscribe({
      next:(res:any)=>{
        this.allDetails.blogsLength=res.length;

      },error:(err:any)=>{
        console.log(err);
      }
    });
  }
  
  getAllFeedbacks() {
    this.api.getFeedbacks().subscribe({
      next:(res:any)=>{
        // console.log(res);
        this.allDetails.feedbackLength=res.length;

      },error:(err:any)=>{
        console.log(err);
      }
    });
  }
  getAllContacts() {
    this.api.getContacts().subscribe({
      next:(res:any)=>{
        // console.log(res);
        this.allDetails.contactLength=res.length;

      },error:(err:any)=>{
        console.log(err);
      }
    });
  }

}
