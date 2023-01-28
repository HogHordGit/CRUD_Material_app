import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductInterface } from '../types/product.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  createData(data: ProductInterface): Observable<ProductInterface> {
    return this.httpClient.post<ProductInterface>("http://localhost:3000/productsList", data);
  }

  readData(): Observable<ProductInterface[]> {
    return this.httpClient.get<ProductInterface[]>("http://localhost:3000/productsList");
  }

  updateData(data: ProductInterface, id: number): Observable<ProductInterface> {
    return this.httpClient.put<ProductInterface>(`http://localhost:3000/productsList/${id}`, data);
  }

  deleteData(id: number): Observable<any> {
    return this.httpClient.delete<any>(`http://localhost:3000/productsList/${id}`);
  }

}
