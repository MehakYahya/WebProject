import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {APIResponceModel} from '../Model/product';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  apiUrl = 'https://freeapi.miniprojectideas.com/api/BigBasket';

  constructor(private http: HttpClient) { }

  getAllProducts():Observable<APIResponceModel> {
    return this.http.get<APIResponceModel>(this.apiUrl+"GetAllProducts")
  }
}
