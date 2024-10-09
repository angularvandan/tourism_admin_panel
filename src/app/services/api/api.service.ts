import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  baseUrl = environment.backendUrl;
  getUsers() {
    return this.http.get(`${this.baseUrl}/api/admin/getAllUsers`);
  }

  createUser(formData: any) {
    return this.http.post(`${this.baseUrl}/api/user/register`, formData);
  }

  loginUser(formData: any) {
    return this.http.post(`${this.baseUrl}/api/user/login`, formData);
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
