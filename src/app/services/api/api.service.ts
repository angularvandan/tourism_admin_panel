import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../../models/user';
import { Router } from '@angular/router';

const USER_KEY='tourism_web';


@Injectable({
  providedIn: 'root',
})
export class ApiService {


  private userSubject =new BehaviorSubject<User>(this.getuserFromLocalStorage());
  public userObservable:Observable<User>;
  baseUrl = environment.backendUrl;

  constructor(private http: HttpClient,private router:Router) {
    this.userObservable=this.userSubject.asObservable();

  }
  public get currentUser():User{
    return this.userSubject.value;//it will give latest value of subject;
  }

  getUsers() {
    return this.http.get(`${this.baseUrl}/api/admin/getAllUsers`);
  }

  createUser(formData: any) {
    return this.http.post(`${this.baseUrl}/api/user/register`, formData);
  }
  createTours(data:any){
    return this.http.post(`${this.baseUrl}/api/tours`,data);
  }
  getTours(){
    return this.http.get(`${this.baseUrl}/api/tours`);
  }
  getToursById(id:any){
    return this.http.get(`${this.baseUrl}/api/tours/${id}`);
  }
  deleteTour(id:any){
    return this.http.delete(`${this.baseUrl}/api/tours/${id}`);

  }

  getImageUrl(formData:any){
    return this.http.post(`${this.baseUrl}/api/upload`,formData);
  }

  loginUser(formData: any) {
    return this.http.post<User>(`${this.baseUrl}/api/user/login`, formData).pipe(
      tap({
        next:(response)=>{
          console.log(response);
          this.setUserToLocalStorage(response);
          this.userSubject.next(response);

        },error:(err)=>{
          console.log(err);
        }
      }));
  }
  logOut(){
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    this.router.navigate(['/login']);

  }
  private setUserToLocalStorage(user:User){
    localStorage.setItem(USER_KEY,JSON.stringify(user))
  }

  private getuserFromLocalStorage():User{
    const userJson=localStorage.getItem(USER_KEY);
    if(userJson) return JSON.parse(userJson)as User;
    return new User();
  }

  deleteUser(id: any) {
    return this.http.delete(`${this.baseUrl}/api/admin/user/${id}`);
  }
  getProducts() {
    return this.http.get(`${this.baseUrl}/api/product/get-products`);
  }

  createProduct(formData: any) {
    return this.http.post(`${this.baseUrl}/api/product/add-product`, formData);
  }

  deleteProduct(id: any) {
    return this.http.delete(`${this.baseUrl}/api/product/${id}`);
  }
}
