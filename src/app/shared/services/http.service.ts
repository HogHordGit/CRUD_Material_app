import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ProductInterface } from '../types/product.interface';

const url: string = "https://ng-material-crud---25-01-23-default-rtdb.europe-west1.firebasedatabase.app/productsList";
const httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})};

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  createData(data: ProductInterface): Observable<ProductInterface> {
    return this.httpClient.post<ProductInterface>(`${url}.json`, data, httpOptions);
  }

  readData(): Observable<ProductInterface[]> {
    return this.httpClient.get<ProductInterface[]>(`${url}.json`, httpOptions)
      .pipe(
        map(res => {
          const arr: ProductInterface[] = [];
          Object.keys(res).forEach(((key: any) => arr.push({key, ...res[key]})));

          return arr;
        })
      );
  }

  updateData(data: ProductInterface, key: string | undefined): Observable<ProductInterface> {
    return this.httpClient.put<ProductInterface>(`${url}/${key}.json`, data);
  }

  deleteData(key: string): Observable<any> {
    return this.httpClient.delete<any>(`${url}/${key}.json`);
  }

}
