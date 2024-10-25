import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../../models/user';
import { Router } from '@angular/router';

const USER_KEY = 'tourism_web';


@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private userSubject = new BehaviorSubject<User>(this.getuserFromLocalStorage());
  public userObservable: Observable<User>;
  baseUrl = environment.backendUrl;

  private formActionSubject = new BehaviorSubject<string>('add'); // Default action is 'add'
  // Observable to expose the form action
  formAction$: Observable<string> = this.formActionSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.userObservable = this.userSubject.asObservable();

  }

  // Method to switch form action to 'add' mode
  setAddAction(): void {
    this.formActionSubject.next('add');
  }

  // Method to switch form action to 'update' mode
  setUpdateAction(): void {
    this.formActionSubject.next('update');
  }

  public get currentUser(): User {
    return this.userSubject.value;//it will give latest value of subject;
  }
  //for tours
  createTours(data: any) {
    return this.http.post(`${this.baseUrl}/api/tours`, data);
  }
  updateTour(data:any,id:any){
    return this.http.put(`${this.baseUrl}/api/tours/${id}`, data);
  }
  getTours() {
    return this.http.get(`${this.baseUrl}/api/tours`);
  }

  deleteTour(id: any) {
    return this.http.delete(`${this.baseUrl}/api/tours/${id}`);

  }
  // for spots
  createSpots(data: any) {
    return this.http.post(`${this.baseUrl}/api/spots`, data);
  }
  updateSpot(data:any,id:any){
    return this.http.put(`${this.baseUrl}/api/spots/${id}`, data);

  }
  getSpots() {
    return this.http.get(`${this.baseUrl}/api/spots`);
  }

  deleteSpot(id: any) {
    return this.http.delete(`${this.baseUrl}/api/spots/${id}`);
  }
  // for activities
  createActivities(data: any) {
    return this.http.post(`${this.baseUrl}/api/activities`, data);
  }
  updateActivities(data:any,id:any){
    return this.http.put(`${this.baseUrl}/api/activities/${id}`, data);
  }
  getActivities() {
    return this.http.get(`${this.baseUrl}/api/activities`);
  }

  deleteActivityById(id: any) {
    return this.http.delete(`${this.baseUrl}/api/activities/${id}`);
  }
  //blog
  createBlogs(data: any) {
    return this.http.post(`${this.baseUrl}/api/blogs`, data);
  }
  updateBlog(data:any,id:any){
    return this.http.put(`${this.baseUrl}/api/blogs/${id}`, data);
  }
  getBlogs() {
    return this.http.get(`${this.baseUrl}/api/blogs`);
  }

  deleteBlogById(id: any) {
    return this.http.delete(`${this.baseUrl}/api/blogs/${id}`);
  }

  getBookings(){
    return this.http.get(`${this.baseUrl}/api/booking`);

  }
  updateBooking(data:any,id:any){
    return this.http.patch(`${this.baseUrl}/api/booking/${id}`,data);
  }
  getPayments(){
    return this.http.get(`${this.baseUrl}/api/payment`);
  }
  getFeedbacks(){
    return this.http.get(`${this.baseUrl}/api/feedback`);

  }
  getContacts(){
    return this.http.get(`${this.baseUrl}/api/contact`);
  }



  getImageUrl(formData: any) {
    return this.http.post(`${this.baseUrl}/api/upload`, formData);
  }

  loginUser(formData: any) {
    return this.http.post<User>(`${this.baseUrl}/api/user/login`, formData).pipe(
      tap({
        next: (response) => {
          console.log(response);
          this.setUserToLocalStorage(response);
          this.userSubject.next(response);

        }, error: (err) => {
          console.log(err);
        }
      }));
  }
  logOut() {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    this.router.navigate(['/login']);

  }
  private setUserToLocalStorage(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  }

  private getuserFromLocalStorage(): User {
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) return JSON.parse(userJson) as User;
    return new User();
  }

}
